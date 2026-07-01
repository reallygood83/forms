import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { authOptions } from "@/lib/auth";
import type { FormSpec } from "@/lib/form-spec";
import {
  asText,
  buildTopicOptions,
  normalizeQuizQuestions,
  normalizeSurveyQuestions,
  pickSentence,
  splitSentences,
} from "@/lib/generation-quality";

type GenerationSource = "gemini" | "template" | "gemini-fallback";

const GEMINI_MODEL = "gemini-3.1-flash-lite";
const MAX_OUTPUT_TOKENS = 8192;

function clampQuestionCount(value: unknown, fallback: number) {
  const numeric = Number(value);
  if (Number.isFinite(numeric)) {
    return Math.max(1, Math.min(Math.trunc(numeric), 20));
  }
  return fallback;
}

function extractJsonObject(text: string, label: string): Record<string, unknown> {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  let jsonString = (fenced?.[1] ?? trimmed).trim();

  const firstBrace = jsonString.indexOf("{");
  const lastBrace = jsonString.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    jsonString = jsonString.slice(firstBrace, lastBrace + 1);
  }

  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("JSON object expected");
    }
    return parsed as Record<string, unknown>;
  } catch (parseError) {
    throw new Error(
      `${label} 응답을 JSON으로 파싱하는 중 오류 발생: ${
        parseError instanceof Error ? parseError.message : "Unknown error"
      }`,
    );
  }
}

async function generateJsonText(
  apiKey: string,
  prompt: string,
  temperature: number,
  label: string,
) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction:
      "You are an expert Korean education assessment designer. Think through the input privately, then return only valid JSON matching the requested shape.",
    generationConfig: {
      temperature,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      responseMimeType: "application/json",
    },
  });

  console.log(`[api/generate] ${label} - Gemini ${GEMINI_MODEL} 호출 시작`);
  const result = await model.generateContent(prompt);
  const response = result.response;
  const candidates = response.candidates;
  if (!candidates?.length) {
    throw new Error("Gemini API 응답에 콘텐츠가 없습니다.");
  }

  const finishReason = candidates[0]?.finishReason;
  if (finishReason && finishReason !== "STOP" && finishReason !== "MAX_TOKENS") {
    throw new Error(`콘텐츠 생성이 예기치 않게 중단되었습니다. 이유: ${finishReason}`);
  }

  const text = response.text();
  console.log(`[api/generate] ${label} - 응답 텍스트 길이:`, text.length);
  return text;
}

function buildFallbackQuizSpec(data: Record<string, unknown> | null): FormSpec {
  const {
    title = "자동 생성 퀴즈",
    text = "",
    grade = "",
    count = 5,
    questionType = "mixed",
  } = data ?? {};

  const questionCount = clampQuestionCount(count, 5);
  // 100점 만점 시스템: 문항수에 따라 배점 자동 계산
  const pointsPerQuestion = Math.round(100 / questionCount);

  const topic = asText(title, "학습 내용");
  const sentences = splitSentences(text);
  const excerpt = sentences[0] ?? asText(text, topic).slice(0, 120);

  const makeMultipleChoice = (index: number) => {
    const sentence = pickSentence(sentences, index, excerpt);
    const correct = sentence.endsWith(".") ? sentence.slice(0, -1) : sentence;
    return {
      type: "multiple_choice" as const,
      title: `${index + 1}. 다음 중 ${topic}에 대한 설명으로 알맞은 것은?`,
      description: excerpt,
      required: true,
      options: buildTopicOptions(topic, correct),
      shuffleOptions: true,
      grading: {
        pointValue: pointsPerQuestion,
        correctAnswers: [correct],
        explanation: `원문에서 확인할 수 있는 핵심 설명은 "${correct}"입니다.`,
      },
    };
  };

  const makeShortAnswer = (index: number) => {
    const sentence = pickSentence(sentences, index, excerpt);
    return {
      type: "short_answer" as const,
      title: `${index + 1}. ${topic}에서 중요한 내용을 한 문장으로 설명해 보세요.`,
      description: excerpt,
      required: true,
      grading: {
        pointValue: pointsPerQuestion,
        expectedAnswer: sentence,
        explanation: `답안에는 "${sentence}"의 핵심 의미가 포함되어야 합니다.`,
      },
    };
  };

  const items = Array.from({ length: questionCount }).map((_, index) => {
    if (questionType === "multiple_choice") return makeMultipleChoice(index);
    if (questionType === "short_answer") return makeShortAnswer(index);
    return index % 2 === 0
      ? makeMultipleChoice(index)
      : makeShortAnswer(index);
  });

  return {
    title: (typeof title === "string" ? title : null) || "자동 생성 퀴즈",
    description: typeof grade === "string" && grade ? `${grade} 대상 기본 퀴즈` : undefined,
    isQuiz: true,
    items,
  };
}

async function buildGeminiQuizSpec(
  data: Record<string, unknown> | null,
  apiKey: string,
): Promise<FormSpec> {
  const {
    title = "AI 퀴즈",
    text = "",
    grade = "",
    count = 5,
    questionType = "mixed",
    difficulty = "medium",
    collectPersonalInfo = false,
  } = data ?? {};

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    throw new Error("원본 텍스트를 입력해주세요.");
  }

  const questionCount = clampQuestionCount(count, 5);

  let difficultyPrompt = "";
  switch (difficulty) {
    case "easy":
      difficultyPrompt =
        "기본 개념을 중심으로, 단순하고 명확한 문제를 생성해주세요.";
      break;
    case "hard":
      difficultyPrompt =
        "고급 개념과 복합적인 문제를 포함하여, 사고력을 요구하는 문제를 생성해주세요.";
      break;
    default:
      difficultyPrompt =
        "기본 개념과 응용 문제를 적절히 섞어서 생성해주세요.";
  }

  let typePrompt = "";
  if (questionType === "mixed") {
    typePrompt =
      "객관식(선택지 5개, 정답 포함)과 단답형 문항을 적절히 섞어서 만들어줘. 객관식은 반드시 5지 선다형이어야 해.";
  } else if (questionType === "multiple_choice") {
    typePrompt =
      "모든 문항을 객관식(선택지 5개, 정답 포함)으로 만들어줘. 반드시 5지 선다형이어야 해.";
  } else if (questionType === "short_answer") {
    typePrompt = "모든 문항을 단답형으로 만들어줘.";
  }

  const prompt = `
역할: 한국 교사를 돕는 평가 문항 설계 전문가.

입력 텍스트가 짧거나 단순해도 바로 얕은 문제를 만들지 말고, 먼저 핵심 개념, 학년 수준, 오개념 가능성, 문항 난이도 흐름을 내부적으로 추론한 뒤 퀴즈를 설계해줘.
추론 과정은 출력하지 말고 최종 JSON만 반환해.

퀴즈 제목: ${title}
대상 학년: ${grade}
문항 수: 정확히 ${questionCount}개

${difficultyPrompt}
${typePrompt}

필수 요구사항:
1. 문항 개수는 정확히 ${questionCount}개여야 해
2. 객관식 문항은 5개의 선택지를 포함해야 해
3. 각 문항은 하나의 학습 목표만 평가하고, 원본 텍스트의 단순 복붙이 아니라 이해, 적용, 구분, 추론 중 하나를 평가해야 해
4. 객관식 오답은 그럴듯하지만 명확히 틀린 선택지로 만들고, 선택지 길이와 문체를 비슷하게 맞춰
5. 모든 문항에는 학생이 바로 배울 수 있는 1-2문장 해설을 포함해
6. 쉬운 문항에서 어려운 문항으로 자연스럽게 배치해
7. 질문은 한국어로 명확하고 짧게 작성해
8. 부정형/이중부정 질문, "모두 정답", "정답 없음" 선택지는 사용하지 마

JSON 형식:
{
  "quizTitle": "${title}",
  "questions": [
    {
      "type": "multiple_choice",
      "question": "질문",
      "options": ["선택지1", "선택지2", "선택지3", "선택지4", "정답"],
      "correctAnswer": "정답",
      "explanation": "정답이 왜 정답인지, 다른 선택지가 왜 틀렸는지에 대한 상세한 해설"
    },
    {
      "type": "short_answer",
      "question": "질문",
      "expectedAnswer": "예상 정답",
      "explanation": "답안 작성 시 유의사항과 채점 기준에 대한 상세한 해설"
    }
  ]
}

--- 원본 텍스트 ---
${text}
--- 텍스트 끝 ---
`;

  const parsed = extractJsonObject(
    await generateJsonText(apiKey, prompt, difficulty === "hard" ? 0.75 : 0.55, "Quiz"),
    "Quiz",
  );
  if (!parsed.questions || !Array.isArray(parsed.questions)) {
    throw new Error("Gemini 응답 형식이 올바르지 않습니다.");
  }

  const questions = parsed.questions as Record<string, unknown>[];
  const pointsPerQuestion = Math.round(100 / questionCount);
  const items = normalizeQuizQuestions(questions, questionCount, pointsPerQuestion);

  // 개인정보 수집 필드 추가 (Apps Script 패턴 적용)
  const personalInfoItems: FormSpec["items"] = [];

  if (collectPersonalInfo) {
    personalInfoItems.push(
      {
        type: "short_answer",
        title: "학년",
        description: "예: 3학년, 중3, 고2",
        required: true,
      },
      {
        type: "short_answer",
        title: "반",
        description: "예: 1반, 2반",
        required: true,
      },
      {
        type: "short_answer",
        title: "번호",
        description: "예: 1번, 15번",
        required: true,
      },
      {
        type: "short_answer",
        title: "이름",
        required: true,
      }
    );
  }

  // 개인정보 필드를 퀴즈 문항 앞에 배치
  const finalItems = [...personalInfoItems, ...items];

  return {
    title: (typeof title === "string" ? title : null) || "AI 퀴즈",
    description: typeof grade === "string" && grade ? `${grade} 대상 자동 생성 퀴즈` : undefined,
    isQuiz: true,
    items: finalItems,
  };
}

function buildFallbackSurveySpec(data: Record<string, unknown> | null): FormSpec {
  const {
    title = "AI 설문",
    purpose = "",
    audience = "",
    numQuestions = 5,
    originalText = "",
    collectName = false,
    collectPhone = false,
    collectEmail = false,
  } = data ?? {};

  const questionCount = clampQuestionCount(numQuestions, 5);
  const topic = asText(title, "설문 주제");
  const goal = asText(purpose, `${topic}에 대한 의견 수집`);
  const respondents = asText(audience, "응답자");
  const contextSnippet =
    typeof originalText === "string" && originalText.length > 0
      ? originalText.slice(0, 160)
      : undefined;

  const templates: FormSpec["items"] = [
    {
      type: "multiple_choice" as const,
      title: `1. ${topic}에서 가장 도움이 된 부분은 무엇인가요?`,
      description: `목적: ${goal}`,
      required: true,
      options: [
        "내용이 이해하기 쉬웠다",
        "활동 방식이 흥미로웠다",
        "친구들과 의견을 나눌 수 있었다",
        "스스로 생각할 시간이 충분했다",
        "특별히 도움이 된 부분은 없었다",
      ],
    },
    {
      type: "linear_scale" as const,
      title: `2. ${topic}이(가) ${respondents}에게 적절했다고 느끼나요?`,
      description: contextSnippet,
      required: true,
      scaleSettings: {
        low: 1,
        high: 5,
        lowLabel: "전혀 그렇지 않다",
        highLabel: "매우 그렇다",
      },
    },
    {
      type: "paragraph" as const,
      title: `3. ${topic}에서 좋았던 점을 구체적으로 적어주세요.`,
      description: contextSnippet,
      required: false,
    },
    {
      type: "checkbox" as const,
      title: `4. ${topic}을(를) 개선하려면 어떤 부분이 필요할까요?`,
      required: true,
      options: [
        "시간을 더 충분히 제공하기",
        "예시나 안내를 더 자세히 제공하기",
        "활동 난이도 조절하기",
        "참여 방식 다양화하기",
        "피드백 기회 늘리기",
      ],
    },
    {
      type: "paragraph" as const,
      title: `5. ${goal}을 위해 추가로 나누고 싶은 의견이 있나요?`,
      required: false,
    },
    {
      type: "multiple_choice" as const,
      title: `6. 다음 ${topic} 활동에 다시 참여하고 싶은가요?`,
      required: true,
      options: ["꼭 참여하고 싶다", "참여하고 싶다", "잘 모르겠다", "별로 참여하고 싶지 않다", "참여하고 싶지 않다"],
    },
    {
      type: "short_answer" as const,
      title: `7. ${topic}을(를) 한 단어로 표현한다면 무엇인가요?`,
      required: false,
    },
  ];

  const items: FormSpec["items"] = Array.from({ length: questionCount }, (_, index) => {
    const template = templates[index % templates.length];
    if (index < templates.length) return template;
    return {
      type: "paragraph",
      title: `${index + 1}. ${topic}에 대해 더 묻고 싶은 점이나 제안이 있다면 적어주세요.`,
      description: `대상: ${respondents}`,
      required: false,
    };
  });

  if (collectName) {
    items.push({
      type: "short_answer",
      title: "이름",
      required: false,
    });
  }
  if (collectPhone) {
    items.push({
      type: "short_answer",
      title: "연락처 (전화번호)",
      required: false,
    });
  }
  if (collectEmail) {
    items.push({
      type: "short_answer",
      title: "이메일",
      required: false,
    });
  }

  return {
    title: (typeof title === "string" ? title : null) || "AI 설문",
    description: `${typeof purpose === "string" ? purpose : "설문 목적"} / 대상: ${typeof audience === "string" ? audience : "전체"}`,
    isQuiz: false,
    items,
  };
}

async function buildGeminiSurveySpec(
  data: Record<string, unknown> | null,
  apiKey: string,
): Promise<FormSpec> {
  const {
    title = "AI 설문",
    purpose = "",
    audience = "일반 사용자",
    numQuestions = 5,
    questionType = "ai_recommended",
    originalText = "",
    collectName = false,
    collectPhone = false,
    collectEmail = false,
  } = data ?? {};

  const questionCount = clampQuestionCount(numQuestions, 5);

  // Build question type instruction
  let typeInstruction = "";
  if (questionType === "multiple_choice") {
    typeInstruction = "모든 질문을 객관식(multiple_choice)으로 작성하세요.";
  } else if (questionType === "checkbox") {
    typeInstruction = "모든 질문을 체크박스(checkbox)로 작성하세요.";
  } else if (questionType === "dropdown") {
    typeInstruction = "모든 질문을 드롭다운(dropdown)으로 작성하세요.";
  } else if (questionType === "short_answer") {
    typeInstruction = "모든 질문을 단답형(short_answer)으로 작성하세요.";
  } else if (questionType === "paragraph") {
    typeInstruction = "모든 질문을 장문형(paragraph)으로 작성하세요.";
  } else if (questionType === "linear_scale") {
    typeInstruction = `모든 질문을 선형 배율(linear_scale)로 작성하세요.
선형 배율 질문 생성 시, 반드시 options 배열에 다음 형식으로 작성하세요:
["1: 매우 그렇지 않다", "2: 그렇지 않다", "3: 보통", "4: 그렇다", "5: 매우 그렇다"]
척도의 숫자와 레이블을 함께 제공해주세요.`;
  } else {
    typeInstruction = `질문 유형은 다양성 자체보다 측정 품질을 우선하세요.

**필수 준수 사항**:
- 만족도/동의 정도는 선형 배율(linear_scale)을 우선 사용하세요
- 하나만 고르는 태도/선호 질문은 객관식(multiple_choice)을 사용하세요
- 여러 답이 동시에 참일 때만 체크박스(checkbox)를 사용하세요
- 자유 의견은 꼭 필요한 1-2개만 장문형(paragraph)으로 작성하세요
- 같은 의미를 반복하는 질문을 만들지 마세요

**각 유형별 사용 가이드**:
1. **객관식(multiple_choice)**: 하나만 선택하는 질문 (예: 성별, 선호도 등)
2. **체크박스(checkbox)**: 여러 개 선택 가능한 질문 (예: 관심사, 경험 등)
3. **선형 배율(linear_scale)**: 만족도, 동의 정도 측정 (1-5점 척도)
   - options 배열 형식: ["1: 전혀 그렇지 않다", "2: 그렇지 않다", "3: 보통", "4: 그렇다", "5: 매우 그렇다"]
4. **단답형(short_answer)**: 짧은 텍스트 응답 (예: 이름, 간단한 의견)
5. **장문형(paragraph)**: 자유롭게 의견을 작성하는 질문

**권장 질문 구성 예시** (${questionCount}문항 기준):
- 객관식: ${Math.max(1, Math.floor(questionCount * 0.3))}개
- 선형 배율: ${Math.max(1, Math.floor(questionCount * 0.2))}개
- 장문형: ${Math.max(1, Math.floor(questionCount * 0.15))}개
- 체크박스/단답형: 필요할 때만 사용`;
  }

  const prompt = `
# 역할
당신은 [${audience}]를 대상으로 하는 설문 조사 설계 전문가입니다. Google Forms에 사용할 설문지를 생성하는 임무를 받았습니다.

# 작업 지시
아래 제공된 '설문 주제', '설문 목적', '대상 응답자', '원본 자료'를 바탕으로 Google Forms에 적합한 [${questionCount}]개의 설문 질문 초안을 생성해주세요.
**각 질문 앞에는 반드시 '1. ', '2. '와 같이 순서대로 번호를 붙여주세요.**
입력이 짧거나 모호하면 설문 목적, 응답자의 부담, 분석 가능한 결과 형태를 내부적으로 추론해 질문을 구체화하세요.
추론 과정은 출력하지 말고 최종 JSON만 반환하세요.

# 맥락 정보
- 설문 주제: ${title}
- 설문 목적: ${purpose || "제공되지 않음"}
- 대상 응답자: ${audience}
- 원본 자료: ${originalText || "제공되지 않음"}

# 질문 생성 가이드라인
${typeInstruction}
- 객관식, 체크박스, 드롭다운 질문 생성 시, 답변 선택지를 3~5개 포함해주세요. 필요 시 '기타' 옵션을 포함할 수 있습니다.
- 선형 배율 질문 생성 시, 척도의 양 끝 값에 대한 설명을 반드시 포함해주세요 (예: "1=전혀 그렇지 않다", "5=매우 그렇다").
- 모든 질문은 필수 응답(is_required: true)으로 설정
- 각 질문은 명확하고 이해하기 쉬워야 하며, 대상 응답자의 특성을 고려해주세요
- 응답자가 솔직하고 구체적으로 답변할 수 있도록 질문을 구성해주세요
- 질문 순서는 일반적/쉬운 질문에서 구체적/깊이 있는 질문으로 자연스럽게 진행되어야 합니다
- 같은 의미를 반복하는 질문을 만들지 말고, 각 문항이 서로 다른 분석 관점을 갖도록 하세요
- 선택지는 상호 배타적이고 응답자가 고르기 쉬운 표현으로 작성하세요

## 📋 상담 자료 생성 시 추가 가이드라인 (purpose에 "상담" 키워드 포함 시)
${purpose && (typeof purpose === 'string') && purpose.includes('상담') ? `
**상담 전문 질문 설계 원칙:**
1. **감정 상태 평가**: linear_scale을 활용하여 현재 기분, 스트레스 수준, 만족도 측정
   예시: "최근 일주일간 기분 상태는 어땠나요?" (1: 매우 우울 ~ 5: 매우 좋음)

2. **개방형 응답**: paragraph를 활용하여 깊이 있는 의견 수집
   예시: "최근 가장 힘들었던 일은 무엇인가요? 자유롭게 이야기해주세요."

3. **구체적 행동 파악**: multiple_choice로 생활 패턴, 습관, 행동 선택 조사
   예시: "평소 스트레스 해소 방법은?" (운동, 대화, 취미생활, 수면, 기타)

4. **다중 이슈 파악**: checkbox로 여러 문제 동시 선택 가능
   예시: "현재 어려움을 겪고 있는 부분을 모두 선택해주세요" (학업, 친구관계, 가족관계, 진로 등)

5. **단계적 질문 구성**: 가벼운 질문 → 깊이 있는 질문 순서로 배치
   - 1-2번: 기본 정보 (객관식/단답형)
   - 3-4번: 감정/만족도 (선형 배율)
   - 5-6번: 구체적 상황 (체크박스/객관식)
   - 마지막: 개방형 의견 (장문형)

6. **긍정적 마무리**: 마지막 질문은 희망적이거나 지원 방안을 묻는 형식
   예시: "앞으로 어떤 도움이 필요하다고 생각하나요?"
` : ''}

# 출력 형식 (JSON)
응답은 반드시 아래 JSON 형식으로만 반환해주세요:
{
  "surveyTitle": "${title}",
  "questions": [
    {
      "question_text": "1. 질문 내용 (번호 포함)",
      "question_type": "multiple_choice",
      "options": ["선택지1", "선택지2", "선택지3", "선택지4"],
      "is_required": true
    },
    {
      "question_text": "2. 질문 내용 (번호 포함)",
      "question_type": "linear_scale",
      "options": ["1: 전혀 그렇지 않다", "2: 그렇지 않다", "3: 보통", "4: 그렇다", "5: 매우 그렇다"],
      "is_required": true
    }
  ]
}

question_type은 반드시 다음 중 하나여야 합니다:
- multiple_choice (객관식)
- checkbox (체크박스)
- dropdown (드롭다운)
- short_answer (단답형)
- paragraph (장문형)
- linear_scale (선형 배율)
`;

  console.log('[api/generate] Survey - 프롬프트 길이:', prompt.length);

  const parsed = extractJsonObject(
    await generateJsonText(apiKey, prompt, 0.55, "Survey"),
    "Survey",
  );

  if (!parsed.questions || !Array.isArray(parsed.questions)) {
    console.error('[api/generate] 응답 형식 오류 - questions 배열 없음');
    console.error('[api/generate] 파싱된 객체:', JSON.stringify(parsed));
    throw new Error("Gemini 응답 형식이 올바르지 않습니다 (questions 배열이 없음).");
  }

  const questions = parsed.questions as Record<string, unknown>[];
  console.log(`[api/generate] 파싱 성공: ${questions.length}개 질문 생성됨`);
  const items = normalizeSurveyQuestions(questions, questionCount);

  // Add personal info fields at the BEGINNING (Apps Script pattern)
  const personalInfoItems: FormSpec["items"] = [];

  if (collectName) {
    personalInfoItems.push({
      type: "short_answer",
      title: "이름을 입력해주세요.",
      required: true,
    });
  }
  if (collectPhone) {
    personalInfoItems.push({
      type: "short_answer",
      title: "연락처(휴대전화번호)를 입력해주세요.",
      description: "'-' 없이 숫자만 입력해주세요.",
      required: true,
    });
  }
  if (collectEmail) {
    personalInfoItems.push({
      type: "short_answer",
      title: "이메일 주소를 입력해주세요.",
      required: true,
    });
  }

  // Combine: personal info first, then survey questions
  const finalItems = [...personalInfoItems, ...items];

  return {
    title: (typeof title === "string" ? title : null) || "AI 설문",
    description: `${typeof purpose === "string" ? purpose : "설문 목적"} / 대상: ${typeof audience === "string" ? audience : "전체"}`,
    isQuiz: false,
    items: finalItems,
  };
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  // 개발 환경에서는 인증을 우회 (임시)
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (!isDevelopment && (!session || !session.user?.email)) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "유효한 JSON을 전달해주세요." },
      { status: 400 },
    );
  }

  const formType = payload?.formType ?? payload?.type;
  if (formType !== "quiz" && formType !== "survey") {
    return NextResponse.json(
      { error: "formType은 quiz 또는 survey 여야 합니다." },
      { status: 400 },
    );
  }

  const geminiApiKey: string | undefined =
    typeof payload?.geminiApiKey === "string"
      ? payload.geminiApiKey.trim()
      : undefined;

  try {
    if (formType === "quiz") {
      if (geminiApiKey) {
        try {
          const spec = await buildGeminiQuizSpec(payload, geminiApiKey);
          return NextResponse.json({
            formSpec: spec,
            source: "gemini" as GenerationSource,
          });
        } catch (error) {
          console.warn(
            "[api/generate] Gemini 실패, 템플릿으로 대체:",
            error instanceof Error ? error.message : error,
          );
          const spec = buildFallbackQuizSpec(payload);
          return NextResponse.json({
            formSpec: spec,
            source: "gemini-fallback" as GenerationSource,
          });
        }
      }

      const spec = buildFallbackQuizSpec(payload);
      return NextResponse.json({
        formSpec: spec,
        source: "template" as GenerationSource,
      });
    }

    // Survey generation
    if (geminiApiKey) {
      try {
        const spec = await buildGeminiSurveySpec(payload, geminiApiKey);
        return NextResponse.json({
          formSpec: spec,
          source: "gemini" as GenerationSource,
        });
      } catch (error) {
        console.warn(
          "[api/generate] Survey Gemini 실패, 템플릿으로 대체:",
          error instanceof Error ? error.message : error,
        );
        const spec = buildFallbackSurveySpec(payload);
        return NextResponse.json({
          formSpec: spec,
          source: "gemini-fallback" as GenerationSource,
        });
      }
    }

    const spec = buildFallbackSurveySpec(payload);
    return NextResponse.json({
      formSpec: spec,
      source: "template" as GenerationSource,
    });
  } catch (error) {
    console.error(
      "[api/generate] FormSpec 생성 오류:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "FormSpec 생성 중 알 수 없는 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
