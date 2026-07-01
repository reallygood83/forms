import { spawn } from "node:child_process";

const explicitBaseUrl = process.env.BASE_URL;
let baseUrl = explicitBaseUrl || "http://localhost:3000";
let devServer;

async function waitForServer(url, timeoutMs) {
  const startedAt = Date.now();
  let lastError;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.status < 500) return;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Server did not become ready at ${url}: ${lastError?.message || "timeout"}`);
}

async function ensureServer() {
  if (explicitBaseUrl) {
    await waitForServer(baseUrl, 10_000);
    return;
  }

  try {
    await waitForServer(baseUrl, 1_000);
    return;
  } catch {
    baseUrl = "http://127.0.0.1:3100";
  }

  const logs = [];
  devServer = spawn(
    "npm",
    ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", "3100"],
    { stdio: ["ignore", "pipe", "pipe"] },
  );
  devServer.stdout.on("data", (chunk) => logs.push(chunk.toString()));
  devServer.stderr.on("data", (chunk) => logs.push(chunk.toString()));

  try {
    await waitForServer(baseUrl, 30_000);
  } catch (error) {
    throw new Error(`${error.message}\n${logs.join("").slice(-4000)}`);
  }
}

async function postGenerate(payload) {
  const response = await fetch(`${baseUrl}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${JSON.stringify(json)}`);
  }
  return json.formSpec;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  await ensureServer();

  const quiz = await postGenerate({
    formType: "quiz",
    title: "물의 순환",
    text: "물은 증발해 수증기가 되고, 차가운 공기를 만나 응결하여 구름이 된다. 구름 속 물방울은 비나 눈으로 땅에 내리고, 강과 바다로 흘러 다시 증발한다.",
    grade: "초등학교 4학년",
    count: 3,
    questionType: "multiple_choice",
    difficulty: "medium",
  });

  const survey = await postGenerate({
    formType: "survey",
    title: "학급 독서 활동 만족도",
    purpose: "아침 독서와 모둠 독서 토론 개선",
    audience: "초등학생",
    numQuestions: 8,
    questionType: "ai_recommended",
    originalText:
      "아침 독서와 모둠 독서 토론을 운영했다. 학생들이 흥미를 느낀 활동과 어려웠던 부분을 파악해 다음 활동을 개선하려고 한다.",
  });

  const quizHasPlaceholders = quiz.items.some(
    (item) =>
      (item.options || []).some((option) => /^보기 \d+$/.test(option)) ||
      /\(객관식\)|\(단답형\)|문항$/.test(item.title),
  );
  const surveyGeneric = survey.items.some((item) =>
    /전체 만족도|지인에게 추천|\d+\. 질문/.test(item.title),
  );

  assert(!quizHasPlaceholders, "fallback quiz should not contain placeholder options or labels");
  assert(survey.items.length === 8, "fallback survey should honor requested question count");
  assert(!surveyGeneric, "fallback survey should not use generic satisfaction templates");

  console.log(
    JSON.stringify(
      {
        pass: true,
        baseUrl,
        quizItems: quiz.items.length,
        surveyItems: survey.items.length,
        firstQuiz: quiz.items[0]?.title,
        firstSurvey: survey.items[0]?.title,
      },
      null,
      2,
    ),
  );
} finally {
  devServer?.kill("SIGTERM");
}
