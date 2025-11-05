'use client';

import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { Sparkles, LayoutDashboard, Youtube, MessageCircle, FileText } from 'lucide-react';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full text-center space-y-8 py-12 sm:py-16">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight uppercase">
              TeaBoard Forms
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 font-medium">
              AI 기반 퀴즈 및 설문 생성기로 업무 시간을 90% 절감하세요
            </p>
          </div>

          {/* Personalized Greeting or Login */}
          {status === 'loading' ? (
            <div className="py-4">
              <div className="h-8 w-48 mx-auto bg-gray-200 animate-pulse rounded"></div>
            </div>
          ) : session?.user ? (
            <div className="py-4">
              <p className="text-2xl font-semibold text-gray-800">
                {session.user.name || session.user.email}님 안녕하세요! 👋
              </p>
            </div>
          ) : null}

          {/* Action Buttons - Chanel Style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            {session?.user ? (
              <>
                {/* Dashboard Button */}
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-black bg-white text-black font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition-all duration-200 rounded-none shadow-sm"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  대시보드
                </Link>

                {/* Create Form Button */}
                <Link
                  href="/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-black bg-black text-white font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-200 rounded-none shadow-sm"
                >
                  <Sparkles className="h-5 w-5" />
                  퀴즈/설문 생성하기
                </Link>
              </>
            ) : (
              <>
                {/* Login Button */}
                <button
                  onClick={() => signIn('google')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-black bg-white text-black font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition-all duration-200 rounded-none shadow-sm"
                >
                  Google로 로그인
                </button>

                {/* Create Form Button (Guest) */}
                <Link
                  href="/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-black bg-black text-white font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-200 rounded-none shadow-sm"
                >
                  <Sparkles className="h-5 w-5" />
                  퀴즈/설문 생성하기
                </Link>
              </>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="p-6 border-2 border-black bg-white">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">빠른 생성</h3>
              <p className="text-sm text-gray-600">AI가 자동으로 퀴즈와 설문을 생성합니다</p>
            </div>
            <div className="p-6 border-2 border-black bg-white">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">정확한 분석</h3>
              <p className="text-sm text-gray-600">Gemini AI 기반 스마트 문항 생성</p>
            </div>
            <div className="p-6 border-2 border-black bg-white">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">즉시 배포</h3>
              <p className="text-sm text-gray-600">Google Forms로 바로 내보내기</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Chanel Style */}
      <footer className="border-t-2 border-black bg-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright and Legal Links */}
            <div className="text-center md:text-left space-y-2">
              <p className="text-sm font-medium text-gray-800">
                © 2025 Moon-Jung Kim. All rights reserved.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Link
                  href="/terms"
                  className="text-xs text-gray-600 hover:text-black underline underline-offset-2 transition-colors duration-200"
                >
                  서비스 이용약관
                </Link>
                <span className="text-xs text-gray-400">|</span>
                <Link
                  href="/privacy"
                  className="text-xs text-gray-600 hover:text-black underline underline-offset-2 transition-colors duration-200"
                >
                  개인정보처리방침
                </Link>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a
                href="https://www.youtube.com/@%EB%B0%B0%EC%9B%80%EC%9D%98%EB%8B%AC%EC%9D%B8-p5v"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-red-600 bg-white text-red-600 font-semibold text-sm uppercase tracking-wide hover:bg-red-600 hover:text-white transition-all duration-200 rounded-none"
              >
                <Youtube className="h-4 w-4" />
                배움의 달인
              </a>
              <a
                href="https://open.kakao.com/o/gubGYQ7g"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-yellow-500 bg-white text-yellow-600 font-semibold text-sm uppercase tracking-wide hover:bg-yellow-500 hover:text-white transition-all duration-200 rounded-none"
              >
                <MessageCircle className="h-4 w-4" />
                개발자 연락하기
              </a>
              <a
                href="https://pebble-stallion-abb.notion.site/2a010244f99780929827c7d2201f2d98"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-green-600 bg-white text-green-600 font-semibold text-sm uppercase tracking-wide hover:bg-green-600 hover:text-white transition-all duration-200 rounded-none"
              >
                <FileText className="h-4 w-4" />
                활용 신청
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
