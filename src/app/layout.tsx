import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/session-provider";
import { Navbar } from '@/components/Navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://forms.teaboard.link'),
  title: "Teaboard Forms - AI 기반 구글폼 자동 생성",
  description: "AI를 활용하여 퀴즈와 설문을 자동으로 생성하고 구글 폼으로 즉시 배포하세요. Gemini AI로 교육용 퀴즈와 전문 설문조사를 손쉽게 제작할 수 있습니다.",
  keywords: ["구글폼", "AI", "퀴즈 생성", "설문조사", "Gemini", "교육", "자동화"],
  authors: [{ name: "Teaboard" }],
  creator: "Teaboard",
  publisher: "Teaboard",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://forms.teaboard.link",
    title: "Teaboard Forms - AI 기반 구글폼 자동 생성",
    description: "AI를 활용하여 퀴즈와 설문을 자동으로 생성하고 구글 폼으로 즉시 배포하세요.",
    siteName: "Teaboard Forms",
    images: [
      {
        url: "https://forms.teaboard.link/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Teaboard Forms - AI 기반 구글폼 자동 생성",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teaboard Forms - AI 기반 구글폼 자동 생성",
    description: "AI를 활용하여 퀴즈와 설문을 자동으로 생성하고 구글 폼으로 즉시 배포하세요.",
    images: ["https://forms.teaboard.link/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <Navbar />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
