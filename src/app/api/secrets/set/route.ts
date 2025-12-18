import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getAdminDb } from "@/lib/firebase-admin";
import { encryptBYOK } from "@/lib/crypto";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await req.json().catch(() => null);
  const { key } = (body ?? {}) as { key?: string };
  if (!key) {
    return NextResponse.json({ error: "Missing 'key' in body" }, { status: 400 });
  }

  try {
    const enc = encryptBYOK(key);
    const adminDb = getAdminDb();
    const docRef = adminDb.collection("users").doc(session.user.email).collection("secrets").doc("gemini");
    await docRef.set({ ...enc, createdAt: Date.now() }, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    console.error("Error saving Gemini API key:", e);
    const errorMessage = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}