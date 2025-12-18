import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getAdminAuth } from "@/lib/firebase-admin";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const uid = `nextauth:${session.user.email}`;
    const adminAuth = getAdminAuth();
    const token = await adminAuth.createCustomToken(uid);
    return NextResponse.json({ token });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Admin not configured";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}