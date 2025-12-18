import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { upsertGoogleTokens, getGoogleTokens } from "@/lib/google-tokens";

async function refreshGoogleAccessToken(refreshToken: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth client credentials are not configured");
  }

  const result = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!result.ok) {
    const body = await result.text();
    throw new Error(`Failed to refresh Google access token: ${body}`);
  }

  const payload = (await result.json()) as {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
  };

  return {
    accessToken: payload.access_token,
    expiresAt: Date.now() + (payload.expires_in ?? 0) * 1000,
    refreshToken: payload.refresh_token ?? refreshToken,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/forms.body https://www.googleapis.com/auth/drive.file",
          prompt: "consent", // 항상 동의 화면 표시하여 refresh_token 확보
          access_type: "offline", // 오프라인 액세스로 refresh_token 요청
          response_type: "code", // authorization code flow 명시
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (user?.email && account?.provider === "google") {
        await upsertGoogleTokens(user.email, {
          accessToken: account.access_token ?? undefined,
          refreshToken: account.refresh_token ?? undefined,
          expiresAt: account.expires_at ? account.expires_at * 1000 : undefined,
        });
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (token.accessTokenExpires) {
        session.accessTokenExpires = token.accessTokenExpires as number;
      }
      if (token.error) {
        session.error = token.error as string;
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (user?.email && !token.email) {
        token.email = user.email;
      }

      if (account?.provider === "google") {
        token.accessToken = account.access_token ?? token.accessToken;
        token.refreshToken = account.refresh_token ?? token.refreshToken;
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + 3600 * 1000;

        if (!token.refreshToken && user?.email) {
          const saved = await getGoogleTokens(user.email);
          if (saved?.refreshToken) {
            token.refreshToken = saved.refreshToken;
          }
        }

        if (user?.email) {
          await upsertGoogleTokens(user.email, {
            accessToken: token.accessToken as string | undefined,
            refreshToken: token.refreshToken as string | undefined,
            expiresAt: token.accessTokenExpires as number | undefined,
          });
        }

        return token;
      }

      if (!token.refreshToken && token.email) {
        const saved = await getGoogleTokens(token.email);
        if (saved?.refreshToken) {
          token.refreshToken = saved.refreshToken;
        }
      }

      if (
        token.accessToken &&
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires - 60_000
      ) {
        return token;
      }

      if (!token.refreshToken) {
        token.error = "MissingRefreshToken";
        return token;
      }

      try {
        const refreshed = await refreshGoogleAccessToken(
          token.refreshToken as string,
        );
        token.accessToken = refreshed.accessToken;
        token.accessTokenExpires = refreshed.expiresAt;
        token.refreshToken = refreshed.refreshToken ?? token.refreshToken;

        if (token.email) {
          await upsertGoogleTokens(token.email, {
            accessToken: token.accessToken as string | undefined,
            refreshToken: token.refreshToken as string | undefined,
            expiresAt: token.accessTokenExpires as number | undefined,
          });
        }
      } catch (error: unknown) {
        token.error = error instanceof Error ? error.message : "RefreshAccessTokenError";
      }

      return token;
    },
  },
};
