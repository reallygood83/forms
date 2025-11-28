import { getAdminDb } from "@/lib/firebase-admin";

type TokenPayload = {
  accessToken?: string | null;
  refreshToken?: string | null;
  expiresAt?: number | null;
};

type StoredTokens = {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
};

function sanitizePayload(payload: TokenPayload) {
  const data: Record<string, unknown> = {
    updatedAt: Date.now(),
  };
  // accessToken과 expiresAt은 항상 업데이트 (null/undefined라도)
  if (payload.accessToken !== undefined) data.accessToken = payload.accessToken;
  if (payload.expiresAt !== undefined) data.expiresAt = payload.expiresAt;

  // refreshToken은 새 값이 있을 때만 업데이트 (기존 값 보존)
  if (payload.refreshToken) data.refreshToken = payload.refreshToken;

  return data;
}

export async function upsertGoogleTokens(email: string, payload: TokenPayload) {
  try {
    const adminDb = getAdminDb();
    const docRef = adminDb
      .collection("users")
      .doc(email)
      .collection("auth")
      .doc("google");
    await docRef.set(sanitizePayload(payload), { merge: true });
  } catch (error) {
    console.warn(
      "[google-tokens] Failed to upsert Google tokens for user.",
      (error as Error)?.message ?? error,
    );
  }
}

export async function getGoogleTokens(
  email: string,
): Promise<StoredTokens | null> {
  try {
    const adminDb = getAdminDb();
    const docSnap = await adminDb
      .collection("users")
      .doc(email)
      .collection("auth")
      .doc("google")
      .get();
    if (!docSnap.exists) return null;
    return docSnap.data() as StoredTokens;
  } catch (error) {
    console.warn(
      "[google-tokens] Failed to read Google tokens for user.",
      (error as Error)?.message ?? error,
    );
    return null;
  }
}
