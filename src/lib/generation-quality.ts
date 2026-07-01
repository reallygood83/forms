import type { FormSpec } from "@/lib/form-spec";

export function asText(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export function splitSentences(value: unknown) {
  const text = asText(value);
  return text
    .split(/(?<=[.!?。！？]|[다요]\.)|\n+/)
    .map((sentence) => sentence.replace(/\s+/g, " ").trim())
    .filter((sentence) => sentence.length >= 8);
}

export function pickSentence(sentences: string[], index: number, fallback: string) {
  return sentences[index % Math.max(sentences.length, 1)] || fallback;
}

export function buildTopicOptions(topic: string, correct: string) {
  return [
    correct,
    `${topic}은 한 번 일어나면 다시 반복되지 않는다.`,
    `${topic}은 주변 조건과 관계없이 항상 같은 결과만 만든다.`,
    `${topic}에서는 일부 단계가 서로 영향을 주지 않는다.`,
    `${topic}은 관찰하거나 설명할 수 없는 현상이다.`,
  ];
}

export function cleanOptions(options: unknown[]) {
  return Array.from(new Set(options.map(String).map((option) => option.trim()).filter(Boolean)));
}

export function hasWeakCatchAllOption(options: string[]) {
  return options.some((option) => /모두|없음|all of the above|none of the above/i.test(option));
}

export function normalizeQuizQuestions(
  questions: Record<string, unknown>[],
  questionCount: number,
  pointsPerQuestion: number,
): FormSpec["items"] {
  if (questions.length !== questionCount) {
    throw new Error(
      `요청한 문항 개수(${questionCount}개)와 생성된 문항 개수(${questions.length}개)가 일치하지 않습니다.`,
    );
  }

  const items: FormSpec["items"] = [];
  questions.forEach((question, index) => {
    const questionText = asText(question.question);
    if (!questionText) {
      throw new Error(`${index + 1}번 문항의 질문이 누락되었습니다.`);
    }

    const explanation = asText(question.explanation);
    if (explanation.length < 10) {
      throw new Error(`${index + 1}번 문항의 해설이 누락되었거나 너무 짧습니다.`);
    }

    if (question.type === "multiple_choice") {
      const options = Array.isArray(question.options) ? cleanOptions(question.options) : [];
      const correctAnswer = asText(question.correctAnswer);
      if (
        options.length !== 5 ||
        !correctAnswer ||
        !options.includes(correctAnswer) ||
        hasWeakCatchAllOption(options)
      ) {
        throw new Error(`${index + 1}번 객관식 문항의 선택지 또는 정답이 올바르지 않습니다.`);
      }
      items.push({
        type: "multiple_choice",
        title: `${index + 1}. ${questionText}`,
        required: true,
        options,
        shuffleOptions: true,
        grading: {
          pointValue: pointsPerQuestion,
          correctAnswers: [correctAnswer],
          explanation,
        },
      });
      return;
    }

    if (question.type === "short_answer") {
      const expectedAnswer = asText(question.expectedAnswer);
      if (!expectedAnswer) {
        throw new Error(`${index + 1}번 단답형 문항의 예상 정답이 누락되었습니다.`);
      }

      items.push({
        type: "short_answer",
        title: `${index + 1}. ${questionText}`,
        required: true,
        grading: {
          pointValue: pointsPerQuestion,
          expectedAnswer,
          explanation,
        },
      });
      return;
    }

    throw new Error(`${index + 1}번 문항 유형이 지원되지 않습니다: ${String(question.type)}`);
  });

  if (items.length !== questionCount) {
    throw new Error(`생성된 퀴즈 문항 수가 요청 개수(${questionCount}개)와 일치하지 않습니다.`);
  }

  return items;
}

export function normalizeSurveyQuestions(
  questions: Record<string, unknown>[],
  questionCount: number,
): FormSpec["items"] {
  if (questions.length !== questionCount) {
    throw new Error(
      `요청한 설문 문항 개수(${questionCount}개)와 생성된 문항 개수(${questions.length}개)가 일치하지 않습니다.`,
    );
  }

  const items: FormSpec["items"] = [];
  questions.forEach((question, index) => {
    const questionText = asText(question.question_text || question.question);
    if (!questionText) {
      throw new Error(`${index + 1}번 설문 문항의 질문이 누락되었습니다.`);
    }

    const questionType = asText(question.question_type);
    if (!questionType) {
      throw new Error(`${index + 1}번 설문 문항 유형이 누락되었습니다.`);
    }

    const options = Array.isArray(question.options) ? cleanOptions(question.options) : [];
    const isRequired = question.is_required !== false;

    if (questionType === "multiple_choice") {
      if (options.length < 2 || hasWeakCatchAllOption(options)) {
        throw new Error(`설문 객관식 문항 "${questionText}"의 선택지가 올바르지 않습니다.`);
      }
      items.push({ type: "multiple_choice", title: questionText, required: isRequired, options });
    } else if (questionType === "checkbox") {
      if (options.length < 2) {
        throw new Error(`설문 체크박스 문항 "${questionText}"의 선택지가 올바르지 않습니다.`);
      }
      items.push({ type: "checkbox", title: questionText, required: isRequired, options });
    } else if (questionType === "dropdown") {
      if (options.length < 2 || hasWeakCatchAllOption(options)) {
        throw new Error(`설문 드롭다운 문항 "${questionText}"의 선택지가 올바르지 않습니다.`);
      }
      items.push({ type: "dropdown", title: questionText, required: isRequired, options });
    } else if (questionType === "short_answer") {
      items.push({ type: "short_answer", title: questionText, required: isRequired });
    } else if (questionType === "paragraph") {
      items.push({ type: "paragraph", title: questionText, required: isRequired });
    } else if (questionType === "linear_scale") {
      let low = 1;
      let high = 5;
      let lowLabel = "";
      let highLabel = "";

      if (options.length > 0) {
        const parseScaleOption = (optStr: string) => {
          const match = optStr.match(/^(\d+)\s*[:=-]?\s*(.*)/);
          if (match) {
            return { bound: parseInt(match[1], 10), label: match[2].trim() };
          }
          return null;
        };
        const firstParsed = parseScaleOption(options[0]);
        const lastParsed = parseScaleOption(options[options.length - 1]);
        if (firstParsed) {
          low = firstParsed.bound;
          lowLabel = firstParsed.label;
        }
        if (lastParsed) {
          high = lastParsed.bound;
          highLabel = lastParsed.label;
        }
      }

      if ((low !== 0 && low !== 1) || high < 2 || high > 10 || high <= low) {
        throw new Error(`설문 선형 배율 문항 "${questionText}"의 척도 범위가 올바르지 않습니다.`);
      }

      items.push({
        type: "linear_scale",
        title: questionText,
        required: isRequired,
        scaleSettings: { low, high, lowLabel, highLabel },
      });
    } else {
      throw new Error(`${index + 1}번 설문 문항 유형이 지원되지 않습니다: ${questionType}`);
    }
  });

  if (items.length !== questionCount) {
    throw new Error(`생성된 설문 문항 수가 요청 개수(${questionCount}개)와 일치하지 않습니다.`);
  }

  return items;
}
