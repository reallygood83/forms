import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { authOptions } from "@/lib/auth";
import type { FormSpec } from "@/lib/form-spec";

type GenerationSource = "gemini" | "template" | "gemini-fallback";

function clampQuestionCount(value: unknown, fallback: number) {
  const numeric = Number(value);
  if (Number.isFinite(numeric)) {
    return Math.max(1, Math.min(Math.trunc(numeric), 20));
  }
  return fallback;
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

  const excerpt =
    typeof text === "string" && text.length > 0
      ? text.slice(0, 120)
      : undefined;

  const makeMultipleChoice = (index: number) => ({
    type: "multiple_choice" as const,
    title: `${index + 1}. ${title || "문항"} (객관식)`,
    description: excerpt,
    required: true,
    options: ["보기 1", "보기 2", "보기 3", "보기 4", "보기 5"],
    grading: {
      pointValue: pointsPerQuestion,
      correctAnswers: ["보기 1"],
      explanation: "정답과 해설은 생성 후 자유롭게 수정하세요.",
    },
  });

  const makeShortAnswer = (index: number) => ({
    type: "short_answer" as const,
    title: `${index + 1}. ${title || "문항"} (단답형)`,
    description: excerpt,
    required: true,
    grading: {
      pointValue: pointsPerQuestion,
      expectedAnswer: "정답 예시를 입력해 주세요.",
      explanation: "정답 기준은 생성 후 직접 보완하세요.",
    },
  });

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

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: difficulty === "hard" ? 0.8 : 0.7,
      maxOutputTokens: 8192, // 🔧 FIX: 4096 → 8192 (상세한 해설과 여러 문제를 위해 충분한 토큰 확보)
    }
  });

  const prompt = `
다음 텍스트를 바탕으로 '${grade}' 수준에 맞는 퀴즈를 총 ${questionCount}개 생성해줘.
퀴즈 제목은 '${title}'이야.
각 문제마다 반드시 해설을 포함해줘.

${difficultyPrompt}
${typePrompt}

필수 요구사항:
1. 문항 개수는 정확히 ${questionCount}개여야 해
2. 객관식 문항은 5개의 선택지를 포함해야 해
3. 각 문제마다 상세한 해설을 작성해줘
4. 해설에는 정답이 왜 정답인지, 오답은 왜 틀렸는지 명확히 설명해줘

결과는 반드시 아래와 같은 JSON 형식으로 반환해야 해:
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

  console.log('[api/generate] Quiz - Gemini API 호출 시작...');
  const result = await model.generateContent(prompt);
  console.log('[api/generate] Quiz - generateContent 완료');

  const response = await result.response;
  console.log('[api/generate] Quiz - response 객체 획득');

  const generatedText = response.text();
  console.log('[api/generate] Quiz - 응답 텍스트 길이:', generatedText.length);
  console.log('[api/generate] Quiz - 응답 텍스트 앞 200자:', generatedText.substring(0, 200));

  // 🔧 ULTIMATE FIX: 마크다운 코드 블록 완전 제거 + 괄호 매칭
  let jsonString = generatedText.trim();

  console.log('[api/generate] Quiz - 원본 응답 전체 출력 (디버깅):', generatedText);

  // Step 1: 마크다운 코드 블록 제거 (```json 또는 ``` 로 시작하는 경우)
  if (jsonString.startsWith('```json')) {
    jsonString = jsonString.substring(7); // '```json' 제거
    console.log('[api/generate] Quiz - ```json 접두사 제거');
  } else if (jsonString.startsWith('```')) {
    jsonString = jsonString.substring(3); // '```' 제거
    console.log('[api/generate] Quiz - ``` 접두사 제거');
  }

  // Step 2: 마크다운 블록 종료 제거 (``` 로 끝나는 경우)
  if (jsonString.endsWith('```')) {
    jsonString = jsonString.substring(0, jsonString.length - 3);
    console.log('[api/generate] Quiz - ``` 접미사 제거');
  }

  jsonString = jsonString.trim();

  // Step 3: 첫 번째 { 부터 시작하도록 보장
  const firstBrace = jsonString.indexOf('{');
  if (firstBrace > 0) {
    jsonString = jsonString.substring(firstBrace);
    console.log('[api/generate] Quiz - 첫 번째 { 이전 내용 제거');
  }

  // Step 4: 괄호 균형 맞추기 - 마지막 완전한 } 찾기
  let openBraces = 0;
  let lastValidIndex = -1;

  for (let i = 0; i < jsonString.length; i++) {
    if (jsonString[i] === '{') {
      openBraces++;
    } else if (jsonString[i] === '}') {
      openBraces--;
      if (openBraces === 0) {
        lastValidIndex = i;
        break; // 첫 번째 완전한 JSON 객체 종료점 발견
      }
    }
  }

  if (lastValidIndex !== -1) {
    jsonString = jsonString.substring(0, lastValidIndex + 1);
    console.log('[api/generate] Quiz - 괄호 매칭으로 JSON 추출 완료');
  } else {
    console.log('[api/generate] Quiz - 괄호 매칭 실패, 전체 문자열 사용');
  }

  console.log('[api/generate] Quiz - 최종 추출된 JSON 길이:', jsonString.length);
  console.log('[api/generate] Quiz - 최종 JSON 앞 200자:', jsonString.substring(0, 200));
  console.log('[api/generate] Quiz - 최종 JSON 뒤 200자:', jsonString.substring(Math.max(0, jsonString.length - 200)));

  let parsed;
  try {
    parsed = JSON.parse(jsonString);
    console.log('[api/generate] Quiz - JSON 파싱 성공');
  } catch (parseError) {
    console.error('[api/generate] Quiz - JSON 파싱 실패');
    console.error('[api/generate] Quiz - 파싱 시도한 문자열:', jsonString.substring(0, 500));
    throw new Error(`Gemini 응답을 JSON으로 파싱하는 중 오류 발생: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
  }
  if (!parsed.questions || !Array.isArray(parsed.questions)) {
    throw new Error("Gemini 응답 형식이 올바르지 않습니다.");
  }

  // 🚨 문항 개수 엄격 검증 (사용자 요청사항 반영)
  const actualQuestionCount = parsed.questions.length;
  if (actualQuestionCount !== questionCount) {
    throw new Error(
      `요청한 문항 개수(${questionCount}개)와 생성된 문항 개수(${actualQuestionCount}개)가 일치하지 않습니다. ` +
      `다시 생성해주세요.`
    );
  }

  // 🚨 해설 필수 검증 (학습 효과를 위한 필수 요소)
  for (let i = 0; i < parsed.questions.length; i++) {
    const question = parsed.questions[i];
    if (!question.explanation || typeof question.explanation !== 'string' || question.explanation.trim().length < 10) {
      throw new Error(
        `${i + 1}번 문항의 해설이 누락되었거나 너무 짧습니다. ` +
        `모든 문항에는 최소 10자 이상의 상세한 해설이 필요합니다. 다시 생성해주세요.`
      );
    }
  }

  // 100점 만점 시스템: 문항수에 따라 배점 자동 계산
  const pointsPerQuestion = Math.round(100 / actualQuestionCount);

  const items = parsed.questions
    .map((question: Record<string, unknown>, index: number) => {
      if (question.type === "multiple_choice") {
        return {
          type: "multiple_choice" as const,
          title: `${index + 1}. ${question.question}`,
          required: true,
          options: question.options ?? [],
          shuffleOptions: true,
          grading: {
            pointValue: pointsPerQuestion,
            correctAnswers: [question.correctAnswer],
            explanation: question.explanation,
          },
        };
      }
      if (question.type === "short_answer") {
        return {
          type: "short_answer" as const,
          title: `${index + 1}. ${question.question}`,
          required: true,
          grading: {
            pointValue: pointsPerQuestion,
            expectedAnswer: question.expectedAnswer,
            explanation: question.explanation,
          },
        };
      }
      return null;
    })
    .filter(Boolean);

  if (!items.length) {
    throw new Error("생성된 문항이 없습니다.");
  }

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
  const contextSnippet =
    typeof originalText === "string" && originalText.length > 0
      ? originalText.slice(0, 160)
      : undefined;

  const templates = [
    {
      type: "multiple_choice" as const,
      title: "1. 전체 만족도는 어느 정도였나요?",
      description: purpose ? `목적: ${purpose}` : undefined,
      required: true,
      options: [
        "매우 만족",
        "만족",
        "보통",
        "불만족",
        "매우 불만족",
      ],
    },
    {
      type: "paragraph" as const,
      title: "2. 가장 좋았던 점은 무엇인가요?",
      description: audience ? `대상: ${audience}` : undefined,
      required: false,
    },
    {
      type: "paragraph" as const,
      title: "3. 개선이 필요하다고 느낀 부분이 있다면 알려주세요.",
      description: contextSnippet,
      required: false,
    },
    {
      type: "multiple_choice" as const,
      title: "4. 다시 참여하거나 이용할 의향이 있나요?",
      required: true,
      options: [
        "매우 그렇다",
        "그렇다",
        "잘 모르겠다",
        "그렇지 않다",
        "전혀 그렇지 않다",
      ],
    },
    {
      type: "paragraph" as const,
      title: "5. 추가로 공유하고 싶은 의견이 있다면 자유롭게 작성해주세요.",
      required: false,
    },
    {
      type: "multiple_choice" as const,
      title: "6. 지인에게 추천하고 싶은가요?",
      required: true,
      options: ["매우 추천", "추천", "보통", "추천하지 않음", "절대 추천하지 않음"],
    },
    {
      type: "paragraph" as const,
      title: "7. 서비스/프로그램에서 가장 어려웠던 부분은 무엇인가요?",
      required: false,
    },
  ];

  const items: FormSpec["items"] = templates.slice(0, questionCount);

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
    typeInstruction = `**매우 중요**: 반드시 다양한 질문 유형을 골고루 사용하세요!

**필수 준수 사항**:
- ${questionCount}개 질문 중 최소 3가지 이상의 서로 다른 유형을 사용해야 합니다
- 같은 유형이 3개 이상 연속되지 않도록 하세요
- 선형 배율(linear_scale) 질문을 최소 1개 이상 반드시 포함하세요

**각 유형별 사용 가이드**:
1. **객관식(multiple_choice)**: 하나만 선택하는 질문 (예: 성별, 선호도 등)
2. **체크박스(checkbox)**: 여러 개 선택 가능한 질문 (예: 관심사, 경험 등)
3. **선형 배율(linear_scale)**: 만족도, 동의 정도 측정 (1-5점 척도)
   - options 배열 형식: ["1: 전혀 그렇지 않다", "2: 그렇지 않다", "3: 보통", "4: 그렇다", "5: 매우 그렇다"]
4. **단답형(short_answer)**: 짧은 텍스트 응답 (예: 이름, 간단한 의견)
5. **장문형(paragraph)**: 자유롭게 의견을 작성하는 질문

**권장 질문 구성 예시** (${questionCount}문항 기준):
- 객관식: ${Math.max(1, Math.floor(questionCount * 0.3))}개
- 체크박스: ${Math.max(1, Math.floor(questionCount * 0.2))}개
- 선형 배율: ${Math.max(1, Math.floor(questionCount * 0.2))}개
- 단답형: ${Math.max(1, Math.floor(questionCount * 0.15))}개
- 장문형: ${Math.max(1, Math.floor(questionCount * 0.15))}개`;
  }

  // 디버깅: API 키 확인
  console.log('[api/generate] Survey - Gemini API 키 길이:', apiKey.length);
  console.log('[api/generate] Survey - API 키 앞 4자:', apiKey.substring(0, 4));
  console.log('[api/generate] Survey - API 키 뒤 4자:', apiKey.substring(apiKey.length - 4));

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192, // 🔧 FIX: 4096 → 8192 (상세한 설문 항목과 설명을 위해 충분한 토큰 확보)
    }
  });

  const prompt = `
# 역할
당신은 [${audience}]를 대상으로 하는 설문 조사 설계 전문가입니다. Google Forms에 사용할 설문지를 생성하는 임무를 받았습니다.

# 작업 지시
아래 제공된 '설문 주제', '설문 목적', '대상 응답자', '원본 자료'를 바탕으로 Google Forms에 적합한 [${questionCount}]개의 설문 질문 초안을 생성해주세요.
**각 질문 앞에는 반드시 '1. ', '2. '와 같이 순서대로 번호를 붙여주세요.**

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

  console.log('[api/generate] Survey - Gemini API 호출 시작...');
  console.log('[api/generate] Survey - 프롬프트 길이:', prompt.length);

  const result = await model.generateContent(prompt);
  console.log('[api/generate] Survey - generateContent 완료');

  const response = await result.response;
  console.log('[api/generate] Survey - response 객체 획득');
  console.log('[api/generate] Survey - response.candidates 존재 여부:', !!response.candidates);

  // Code.gs 패턴: 응답 유효성 검증
  const candidates = response.candidates;
  if (!candidates || candidates.length === 0) {
    console.error('[api/generate] Gemini 응답에 후보가 없음');
    throw new Error("Gemini API 응답에 콘텐츠가 없습니다.");
  }

  const candidate = candidates[0];
  const finishReason = candidate.finishReason;

  // 종료 사유 확인
  if (finishReason !== "STOP" && finishReason !== "MAX_TOKENS") {
    console.error(`[api/generate] 예기치 않은 종료 사유: ${finishReason}`);
    throw new Error(`콘텐츠 생성이 예기치 않게 중단되었습니다. 이유: ${finishReason}`);
  }

  // 응답 텍스트 추출
  const responseText = response.text();
  console.log('[api/generate] Survey - 응답 텍스트 길이:', responseText.length);
  console.log('[api/generate] Survey - 응답 텍스트 앞 100자:', responseText.substring(0, 100));

  // Code.gs 패턴: JSON 마크다운 블록 처리
  let jsonString = responseText.trim();
  const jsonMatch = jsonString.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (jsonMatch && jsonMatch[1]) {
    jsonString = jsonMatch[1].trim();
    console.log('[api/generate] Survey - JSON 마크다운 블록 추출 성공');
  } else {
    console.log('[api/generate] Warning: JSON response not in markdown block');
  }

  // Code.gs 패턴: 상세한 에러 로깅과 함께 JSON 파싱
  let parsed;
  try {
    parsed = JSON.parse(jsonString);
    console.log('[api/generate] Survey - JSON 파싱 성공');
  } catch (parseError) {
    console.error('[api/generate] JSON 파싱 실패');
    console.error('[api/generate] 원본 응답:', responseText);
    console.error('[api/generate] 파싱 시도한 JSON:', jsonString);
    throw new Error(`Gemini 응답을 JSON으로 파싱하는 중 오류 발생: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
  }

  if (!parsed.questions || !Array.isArray(parsed.questions)) {
    console.error('[api/generate] 응답 형식 오류 - questions 배열 없음');
    console.error('[api/generate] 파싱된 객체:', JSON.stringify(parsed));
    throw new Error("Gemini 응답 형식이 올바르지 않습니다 (questions 배열이 없음).");
  }

  console.log(`[api/generate] 파싱 성공: ${parsed.questions.length}개 질문 생성됨`);


  const items: FormSpec["items"] = parsed.questions
    .map((question: Record<string, unknown>) => {
      const questionText = String(question.question_text || question.question || "");
      const questionType = String(question.question_type || "paragraph");
      const options = Array.isArray(question.options) ? question.options : [];
      const isRequired = question.is_required !== false;

      if (questionType === "multiple_choice") {
        return {
          type: "multiple_choice" as const,
          title: questionText,
          required: isRequired,
          options: options.map(String),
        };
      }
      if (questionType === "checkbox") {
        return {
          type: "checkbox" as const,
          title: questionText,
          required: isRequired,
          options: options.map(String),
        };
      }
      if (questionType === "dropdown") {
        return {
          type: "dropdown" as const,
          title: questionText,
          required: isRequired,
          options: options.map(String),
        };
      }
      if (questionType === "short_answer") {
        return {
          type: "short_answer" as const,
          title: questionText,
          required: isRequired,
        };
      }
      if (questionType === "paragraph") {
        return {
          type: "paragraph" as const,
          title: questionText,
          required: isRequired,
        };
      }
      if (questionType === "linear_scale") {
        // Parse scale settings from options array
        // Expected format: ["1: label1", "2: label2", ..., "5: label5"]
        let low = 1;
        let high = 5;
        let lowLabel = "";
        let highLabel = "";

        if (options.length > 0) {
          const parseScaleOption = (optStr: string) => {
            const match = String(optStr).match(/^(\d+)\s*[:=-]?\s*(.*)/);
            if (match) {
              return { bound: parseInt(match[1], 10), label: match[2].trim() };
            }
            return null;
          };

          const firstParsed = parseScaleOption(String(options[0]));
          const lastParsed = parseScaleOption(String(options[options.length - 1]));

          if (firstParsed) {
            low = firstParsed.bound;
            lowLabel = firstParsed.label;
          }
          if (lastParsed) {
            high = lastParsed.bound;
            highLabel = lastParsed.label;
          }
        }

        return {
          type: "linear_scale" as const,
          title: questionText,
          required: isRequired,
          scaleSettings: {
            low,
            high,
            lowLabel,
            highLabel,
          },
        };
      }
      return null;
    })
    .filter(Boolean);

  if (!items.length) {
    throw new Error("생성된 문항이 없습니다.");
  }

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
