import { createCipheriv, createDecipheriv, randomBytes, createHash } from "crypto";

function getKey(): Buffer {
  const secret = process.env.BYOK_ENCRYPTION_KEY || "";
  if (!secret) throw new Error("BYOK_ENCRYPTION_KEY is not set");
  // Derive a 32-byte key from provided secret string
  return createHash("sha256").update(secret).digest();
}

export function encryptBYOK(plain: string) {
  const iv = randomBytes(12);
  const key = getKey();
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([cipher.update(Buffer.from(plain, "utf8")), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    iv: iv.toString("base64"),
    ciphertext: enc.toString("base64"),
    tag: tag.toString("base64"),
  };
}

export function decryptBYOK(payload: { iv: string; ciphertext: string; tag: string }) {
  const key = getKey();
  const iv = Buffer.from(payload.iv, "base64");
  const tag = Buffer.from(payload.tag, "base64");
  const enc = Buffer.from(payload.ciphertext, "base64");
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(enc), decipher.final()]);
  return dec.toString("utf8");
}