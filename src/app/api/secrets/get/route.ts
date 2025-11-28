import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getAdminDb } from "@/lib/firebase-admin";
import { decryptBYOK } from "@/lib/crypto";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const adminDb = getAdminDb();
    const docRef = adminDb
      .collection("users")
      .doc(session.user.email)
      .collection("secrets")
      .doc("gemini");

    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ exists: false });
    }

    const data = docSnap.data();
    if (!data || !data.ciphertext || !data.iv || !data.tag) {
      return NextResponse.json({ exists: false });
    }

    // Decrypt the API key
    const decrypted = decryptBYOK({
      ciphertext: data.ciphertext,
      iv: data.iv,
      tag: data.tag,
    });

    return NextResponse.json({
      exists: true,
      key: decrypted,
      createdAt: data.createdAt
    });
  } catch (e: unknown) {
    console.error("Error loading Gemini API key:", e);
    const errorMessage = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
