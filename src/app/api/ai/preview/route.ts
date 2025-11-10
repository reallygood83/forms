import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getAdminDb } from "@/lib/firebase-admin";
import { decryptBYOK } from "@/lib/crypto";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminDb = getAdminDb();
  const docSnap = await adminDb
    .collection("users")
    .doc(session.user.email)
    .collection("secrets")
    .doc("gemini")
    .get();

  if (!docSnap.exists) {
    return NextResponse.json({ error: "BYOK not set" }, { status: 400 });
  }

  const payload = docSnap.data() as { iv: string; ciphertext: string; tag: string };
  try {
    decryptBYOK(payload);
  } catch {
    return NextResponse.json({ error: "Failed to decrypt BYOK" }, { status: 500 });
  }

  // TODO: Call Gemini API using BYOK and the request body prompt/spec.
  // For now, return a stub preview.
  return NextResponse.json({
    preview: {
      type: "survey",
      title: "미리보기: 고객 만족도 설문",
      questions: [
        { kind: "multiple_choice", title: "제품 만족도는 어떠셨나요?", options: ["매우 만족", "만족", "보통", "불만", "매우 불만"] },
      ],
    },
  });
}