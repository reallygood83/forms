"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [byok, setByok] = useState("");
  const [saving, setSaving] = useState(false);
  const [hasExistingKey, setHasExistingKey] = useState(false);
  const [loadingKey, setLoadingKey] = useState(true);
  interface PreviewData {
    title: string;
    questions?: Array<{
      title: string;
      options?: string[];
    }>;
  }
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load existing API key on mount
  useEffect(() => {
    async function loadApiKey() {
      if (!session?.user?.email) {
        setLoadingKey(false);
        return;
      }

      try {
        const res = await fetch("/api/secrets/get");
        const json = await res.json();

        if (res.ok && json.exists && json.key) {
          setByok(json.key);
          setHasExistingKey(true);
          setSuccess("✅ 저장된 Gemini API 키를 불러왔습니다.");
        }
      } catch (e) {
        console.error("Failed to load API key:", e);
      } finally {
        setLoadingKey(false);
      }
    }

    loadApiKey();
  }, [session]);

  async function saveBYOK() {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/secrets/set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: byok.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "저장 실패");
      setHasExistingKey(true);
      setSuccess("✅ Gemini API 키를 안전하게 저장했어요!");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  }

  async function generatePreview() {
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/ai/preview", { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "미리보기 실패");
      setPreview(json.preview);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  if (status === "loading") return <div className="p-8">로딩 중…</div>;
  if (!session)
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-2xl font-semibold">로그인이 필요합니다</h1>
          <p className="text-zinc-600">홈 화면에서 Google로 로그인해주세요.</p>
        </div>
      </div>
    );

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">TeaBoard Forms</h1>
          <p className="text-sm text-zinc-600">{session.user?.email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-full border px-4 py-2 text-sm hover:bg-zinc-100"
        >
          로그아웃
        </button>
      </header>

      <section className="space-y-3 rounded-2xl border-[1.5px] border-black bg-white p-6 shadow-sm">
        <h2 className="text-lg font-medium">필수 준비 한눈에</h2>
        <p className="text-sm text-zinc-600">
          Google 로그인으로 Forms 권한은 이미 연결됐어요. 아래 두 가지만 완료하면 바로 폼을 만들 수 있습니다.
        </p>
        <ul className="space-y-2 text-sm text-zinc-700">
          <li>• Gemini API 키를 입력하면 AI 미리보기와 자동 생성 기능을 사용할 수 있어요.</li>
          <li>• 원하는 폼 초안을 작성한 뒤, Google Forms로 한 번에 내보내면 됩니다.</li>
        </ul>
        <button
          onClick={() => router.push('/create')}
          className="mt-4 w-full rounded-md bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          🎯 퀴즈/설문 생성하기
        </button>
      </section>

      <section className="space-y-4 rounded-2xl border-[1.5px] border-black bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Gemini BYOK 입력</h2>
          {loadingKey && (
            <span className="text-sm text-zinc-500">키 불러오는 중...</span>
          )}
          {!loadingKey && hasExistingKey && (
            <span className="text-sm text-emerald-600">✓ 키 저장됨</span>
          )}
        </div>
        <input
          type="password"
          placeholder="Gemini API Key"
          value={byok}
          onChange={(e) => setByok(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          disabled={loadingKey}
        />
        <div className="flex gap-2">
          <button
            onClick={saveBYOK}
            disabled={saving || !byok.trim() || loadingKey}
            className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {saving ? "저장 중…" : hasExistingKey ? "키 업데이트" : "키 저장"}
          </button>
          <button
            onClick={generatePreview}
            className="rounded-md border px-4 py-2"
            disabled={loadingKey}
          >
            설문 미리보기 생성
          </button>
        </div>
        {success && <p className="text-sm text-emerald-600">{success}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </section>

      {preview && (
        <section className="space-y-3 rounded-2xl border-[1.5px] border-black bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium">미리보기</h2>
          <p className="text-zinc-700">{preview.title}</p>
          <ul className="list-disc pl-5 text-zinc-700">
            {preview.questions?.map((q, idx: number) => (
              <li key={idx}>
                <strong>{q.title}</strong>
                {q.options && (
                  <ul className="mt-1 list-disc pl-5 text-sm">
                    {q.options.map((o: string, i: number) => (
                      <li key={i}>{o}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
