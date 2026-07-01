import assert from "node:assert/strict";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, ".omo/ulw-loop/evidence/forms-quality-ulw/tmp-validation");
const require = createRequire(import.meta.url);
const ts = require("typescript");

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const source = await readFile(join(root, "src/lib/generation-quality.ts"), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.CommonJS,
    esModuleInterop: true,
  },
});
await writeFile(join(outDir, "generation-quality.js"), compiled.outputText);

const {
  normalizeQuizQuestions,
  normalizeSurveyQuestions,
} = require(join(outDir, "generation-quality.js"));

const validQuiz = [
  {
    type: "multiple_choice",
    question: "물의 순환에서 증발 다음에 주로 일어나는 과정은 무엇인가요?",
    options: ["응결", "침식", "연소", "자전", "퇴적"],
    correctAnswer: "응결",
    explanation: "증발한 수증기는 차가운 공기를 만나 응결해 구름을 이룹니다.",
  },
  {
    type: "short_answer",
    question: "비나 눈으로 물이 땅에 내리는 과정을 무엇이라고 하나요?",
    expectedAnswer: "강수",
    explanation: "구름 속 물방울이나 얼음 알갱이가 무거워져 떨어지는 과정을 강수라고 합니다.",
  },
];

assert.equal(normalizeQuizQuestions(validQuiz, 2, 50).length, 2);
assert.throws(
  () => normalizeQuizQuestions([{ ...validQuiz[0], type: "essay" }], 1, 100),
  /지원되지 않습니다/,
);
assert.throws(
  () => normalizeQuizQuestions([{ ...validQuiz[0], correctAnswer: "대류" }], 1, 100),
  /선택지 또는 정답/,
);
assert.throws(
  () => normalizeQuizQuestions([{ ...validQuiz[0], question: " " }], 1, 100),
  /질문이 누락/,
);
assert.throws(
  () => normalizeQuizQuestions([{ ...validQuiz[1], expectedAnswer: "" }], 1, 100),
  /예상 정답/,
);

const validSurvey = [
  {
    question_type: "multiple_choice",
    question_text: "아침 독서 활동에서 가장 도움이 된 부분은 무엇인가요?",
    options: ["책 선택 시간", "조용한 환경", "친구 추천", "교사의 안내"],
    is_required: true,
  },
  {
    question_type: "linear_scale",
    question_text: "모둠 독서 토론이 책 이해에 도움이 되었나요?",
    options: ["1: 전혀 아니다", "5: 매우 그렇다"],
    is_required: true,
  },
];

assert.equal(normalizeSurveyQuestions(validSurvey, 2).length, 2);
assert.throws(
  () => normalizeSurveyQuestions([{ ...validSurvey[0], question_type: "ranking" }], 1),
  /지원되지 않습니다/,
);
assert.throws(() => normalizeSurveyQuestions(validSurvey, 3), /일치하지 않습니다/);
assert.throws(
  () => normalizeSurveyQuestions([{ ...validSurvey[0], question_text: "" }], 1),
  /질문이 누락/,
);
assert.throws(
  () => normalizeSurveyQuestions([{ ...validSurvey[0], question_type: "" }], 1),
  /문항 유형이 누락/,
);
assert.throws(
  () =>
    normalizeSurveyQuestions(
      [{ ...validSurvey[1], options: ["5: 높음", "1: 낮음"] }],
      1,
    ),
  /척도 범위/,
);

await rm(outDir, { recursive: true, force: true });

console.log(
  JSON.stringify(
    {
      pass: true,
      checks: [
        "valid quiz maps all items",
        "unknown quiz type rejected",
        "invalid quiz answer rejected",
        "blank quiz question rejected",
        "blank short-answer key rejected",
        "valid survey maps all items",
        "unknown survey type rejected",
        "survey count mismatch rejected",
        "blank survey question rejected",
        "missing survey type rejected",
        "invalid survey scale rejected",
      ],
    },
    null,
    2,
  ),
);
