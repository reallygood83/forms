import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { google } from "googleapis";

import { authOptions } from "@/lib/auth";
import {
  buildBatchUpdateRequestsFromSpec,
  type FormSpec,
} from "@/lib/form-spec";
import {
  getGoogleTokens,
  upsertGoogleTokens,
} from "@/lib/google-tokens";
import { publishForm, updateAndEnsurePublished } from "@/lib/google-forms-api";

function assertGoogleOAuthConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth 환경 변수가 설정되지 않았습니다.");
  }
  return { clientId, clientSecret };
}

async function ensureFreshAccessToken(
  client: InstanceType<typeof google.auth.OAuth2>,
  email: string,
) {
  const credentials = client.credentials;
  const shouldRefresh =
    !credentials.access_token ||
    (credentials.expiry_date !== undefined &&
      credentials.expiry_date !== null &&
      credentials.expiry_date <= Date.now() + 60_000);

  if (shouldRefresh) {
    const refreshed = await client.refreshAccessToken();
    const updated = refreshed.credentials;
    client.setCredentials(updated);
    await upsertGoogleTokens(email, {
      accessToken: updated.access_token ?? null,
      refreshToken: updated.refresh_token ?? credentials.refresh_token ?? null,
      expiresAt: updated.expiry_date ?? null,
    });
    return updated.access_token;
  }

  await upsertGoogleTokens(email, {
    accessToken: credentials.access_token ?? null,
    refreshToken: credentials.refresh_token ?? null,
    expiresAt: credentials.expiry_date ?? null,
  });
  return credentials.access_token;
}

function validateFormSpec(payload: unknown): FormSpec {
  if (
    !payload ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    throw new Error("FormSpec JSON이 유효하지 않습니다.");
  }
  const spec = payload as Partial<FormSpec>;
  if (!spec.title || typeof spec.title !== "string") {
    throw new Error("폼 제목(title)이 필요합니다.");
  }
  if (!Array.isArray(spec.items) || spec.items.length === 0) {
    throw new Error("최소 1개의 질문(items)이 필요합니다.");
  }
  return spec as FormSpec;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  let spec: FormSpec;
  try {
    const body = await req.json();
    spec = validateFormSpec(body);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "유효하지 않은 요청입니다." },
      { status: 400 },
    );
  }

  try {
    const storedTokens = await getGoogleTokens(session.user.email);
    if (!storedTokens?.refreshToken) {
      return NextResponse.json(
        {
          error:
            "Google 인증 토큰이 없습니다. 다시 로그인하여 권한을 부여해주세요.",
        },
        { status: 400 },
      );
    }

    const { clientId, clientSecret } = assertGoogleOAuthConfig();
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({
      access_token: session.accessToken ?? storedTokens.accessToken ?? undefined,
      refresh_token: storedTokens.refreshToken,
      expiry_date: storedTokens.expiresAt ?? undefined,
    });

    oauth2Client.on("tokens", async (tokens) => {
      await upsertGoogleTokens(session.user!.email!, {
        accessToken: tokens.access_token ?? storedTokens.accessToken ?? null,
        refreshToken: tokens.refresh_token ?? storedTokens.refreshToken ?? null,
        expiresAt: tokens.expiry_date ?? storedTokens.expiresAt ?? null,
      });
    });

    const accessToken = await ensureFreshAccessToken(
      oauth2Client,
      session.user.email,
    );

    if (!accessToken) {
      throw new Error("Google 액세스 토큰을 가져오지 못했습니다.");
    }

    const forms = google.forms({ version: "v1", auth: oauth2Client });

    // 1단계: 폼 생성
    console.log("📝 Creating Google Form...");
    const createResponse = await forms.forms.create({
      requestBody: {
        info: {
          title: spec.title,
          documentTitle: spec.title,
        },
      },
    });

    const formId = createResponse.data.formId;
    if (!formId) {
      throw new Error("Google Forms API에서 formId를 반환하지 않았습니다.");
    }
    console.log(`✅ Form created with ID: ${formId}`);

    // 2단계: 배치 업데이트 실행
    const requests = buildBatchUpdateRequestsFromSpec(spec);
    if (requests.length) {
      console.log(`🔄 Updating form ${formId} with ${requests.length} requests...`);
      await updateAndEnsurePublished(formId, requests, oauth2Client);
    } else {
      // 배치 업데이트가 없어도 발행은 필수 (2026.3.31+ 대비)
      console.log(`📤 Publishing form ${formId}...`);
      await publishForm(formId, oauth2Client);
    }

    return NextResponse.json({
      ok: true,
      formId,
      formUrl: `https://docs.google.com/forms/d/${formId}/edit`,
      responderUrl: `https://docs.google.com/forms/d/${formId}/viewform`,
    });
  } catch (error) {
    console.error(
      "[api/forms/create] Google Forms 생성 실패:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "폼 생성 중 알 수 없는 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
