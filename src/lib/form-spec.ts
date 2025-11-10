import type { forms_v1 } from "googleapis";

export type FormItemType =
  | "multiple_choice"
  | "checkbox"
  | "dropdown"
  | "short_answer"
  | "paragraph"
  | "linear_scale";

export interface FormItem {
  type: FormItemType;
  title: string;
  description?: string;
  required?: boolean;
  options?: string[];
  shuffleOptions?: boolean;
  scaleSettings?: {
    low: number;
    high: number;
    lowLabel?: string;
    highLabel?: string;
  };
  grading?: {
    pointValue?: number;
    correctAnswers?: string[];
    expectedAnswer?: string;
    explanation?: string;
  };
}

export interface FormSpec {
  title: string;
  description?: string;
  isQuiz?: boolean;
  items: FormItem[];
}

function buildGrading(
  isQuiz: boolean,
  item: FormItem,
): forms_v1.Schema$Grading | undefined {
  if (!isQuiz || !item.grading) return undefined;

  const grading: forms_v1.Schema$Grading = {};
  if (typeof item.grading.pointValue === "number") {
    grading.pointValue = item.grading.pointValue;
  }

  const answers: forms_v1.Schema$CorrectAnswer[] = [];
  if (item.grading.correctAnswers?.length) {
    for (const answer of item.grading.correctAnswers) {
      answers.push({ value: answer });
    }
  }
  if (item.grading.expectedAnswer) {
    answers.push({ value: item.grading.expectedAnswer });
  }
  if (answers.length) {
    grading.correctAnswers = { answers };
  }

  // 해설(explanation)이 있으면 피드백 추가
  if (item.grading.explanation) {
    if (item.type === "multiple_choice") {
      // 객관식: whenRight/whenWrong 피드백
      grading.whenRight = {
        text: `✅ 정답입니다!\n\n${item.grading.explanation}`,
      };
      grading.whenWrong = {
        text: `❌ 틀렸습니다.\n\n${item.grading.explanation}`,
      };
    } else if (item.type === "short_answer" || item.type === "paragraph") {
      // 단답형/서술형: generalFeedback만 지원
      grading.generalFeedback = {
        text: `정답: ${item.grading.expectedAnswer}\n\n[해설]\n${item.grading.explanation}`,
      };
    }
  }

  return grading;
}

function buildQuestionItem(
  spec: FormSpec,
  item: FormItem,
): forms_v1.Schema$Item | null {
  const grading = buildGrading(Boolean(spec.isQuiz), item);
  const baseQuestion: forms_v1.Schema$Question = {
    required: item.required ?? false,
    grading,
  };

  if (item.type === "multiple_choice" || item.type === "checkbox") {
    if (!item.options?.length) return null;
    baseQuestion.choiceQuestion = {
      options: item.options.map((value) => ({ value })),
      shuffle: Boolean(item.shuffleOptions),
      type: item.type === "checkbox" ? "CHECKBOX" : "RADIO",
    };
  } else if (item.type === "dropdown") {
    if (!item.options?.length) return null;
    baseQuestion.choiceQuestion = {
      options: item.options.map((value) => ({ value })),
      shuffle: Boolean(item.shuffleOptions),
      type: "DROP_DOWN",
    };
  } else if (item.type === "short_answer" || item.type === "paragraph") {
    baseQuestion.textQuestion = {
      paragraph: item.type === "paragraph",
    };
  } else if (item.type === "linear_scale") {
    if (!item.scaleSettings) return null;
    baseQuestion.scaleQuestion = {
      low: item.scaleSettings.low,
      high: item.scaleSettings.high,
      lowLabel: item.scaleSettings.lowLabel,
      highLabel: item.scaleSettings.highLabel,
    };
  } else {
    return null;
  }

  return {
    title: item.title,
    description: item.description,
    questionItem: {
      question: baseQuestion,
    },
  };
}

export function buildBatchUpdateRequestsFromSpec(
  spec: FormSpec,
): forms_v1.Schema$Request[] {
  const requests: forms_v1.Schema$Request[] = [];

  if (spec.isQuiz) {
    requests.push({
      updateSettings: {
        settings: {
          quizSettings: { isQuiz: true },
        },
        updateMask: "quizSettings.isQuiz",
      },
    });
  }

  if (spec.description) {
    requests.push({
      updateFormInfo: {
        info: { description: spec.description },
        updateMask: "description",
      },
    });
  }

  spec.items.forEach((item, index) => {
    const questionItem = buildQuestionItem(spec, item);
    if (!questionItem) return;

    requests.push({
      createItem: {
        item: questionItem,
        location: { index },
      },
    });
  });

  return requests;
}
