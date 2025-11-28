'use client';

import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { Sparkles, LayoutDashboard, Youtube, MessageCircle } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-purple-100">
      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full text-center space-y-12 py-16 sm:py-20">
          {/* Title */}
          <div className="space-y-6">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase text-black">
              TeaBoard Forms
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-800 font-bold bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 transform -rotate-1">
              AI 기반 퀴즈 및 설문 생성기로 업무 시간을 90% 절감하세요
            </p>
          </div>

          {/* Personalized Greeting or Login */}
          {status === 'loading' ? (
            <div className="py-8">
              <div className="h-12 w-64 mx-auto bg-blue-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse"></div>
            </div>
          ) : session?.user ? (
            <div className="py-8">
              <p className="text-3xl font-black text-black bg-green-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 transform rotate-1">
                {session.user.name || session.user.email}님 안녕하세요! 👋
              </p>
            </div>
          ) : null}

          {/* Action Buttons - Neo-Brutalism Style */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            {session?.user ? (
              <>
                {/* Dashboard Button */}
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-6 border-4 border-black bg-blue-400 text-black font-black uppercase tracking-wide shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] transition-all duration-200 text-lg"
                >
                  <LayoutDashboard className="h-6 w-6" />
                  대시보드
                </Link>

                {/* Create Form Button */}
                <Link
                  href="/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-6 border-4 border-black bg-yellow-400 text-black font-black uppercase tracking-wide shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] transition-all duration-200 text-lg transform -rotate-1"
                >
                  <Sparkles className="h-6 w-6" />
                  퀴즈/설문 생성하기
                </Link>
              </>
            ) : (
              <>
                {/* Login Button */}
                <button
                  onClick={() => signIn('google')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-6 border-4 border-black bg-white text-black font-black uppercase tracking-wide shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] transition-all duration-200 text-lg"
                >
                  Google로 로그인
                </button>

                {/* Create Form Button (Guest) */}
                <Link
                  href="/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-6 border-4 border-black bg-lime-400 text-black font-black uppercase tracking-wide shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] transition-all duration-200 text-lg transform rotate-1"
                >
                  <Sparkles className="h-6 w-6" />
                  퀴즈/설문 생성하기
                </Link>
              </>
            )}
          </div>

          {/* Share */}
          <div className="flex justify-center mt-6">
            <ShareButtons title="Teaboard Forms - AI 기반 구글폼 자동 생성" />
          </div>

          {/* Features Grid - Neo-Brutalism */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="p-8 border-4 border-black bg-yellow-400 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="font-black text-xl mb-4 uppercase tracking-wide text-black">빠른 생성</h3>
              <p className="text-lg font-bold text-gray-800">AI가 자동으로 퀴즈와 설문을 생성합니다</p>
            </div>
            <div className="p-8 border-4 border-black bg-green-400 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all -rotate-1">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="font-black text-xl mb-4 uppercase tracking-wide text-black">정확한 분석</h3>
              <p className="text-lg font-bold text-gray-800">Gemini AI 기반 스마트 문항 생성</p>
            </div>
            <div className="p-8 border-4 border-black bg-blue-400 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rotate-1">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="font-black text-xl mb-4 uppercase tracking-wide text-black">즉시 배포</h3>
              <p className="text-lg font-bold text-gray-800">Google Forms로 바로 내보내기</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Neo-Brutalism Style */}
      <footer className="border-t-4 border-black bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright Section */}
            <div className="flex items-center gap-4">
              <p className="text-base font-black text-black bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-3 py-2 whitespace-nowrap">
                © 2025 Moon-Jung Kim
              </p>
              <div className="flex gap-2 items-center">
                <Link
                  href="/terms"
                  className="text-xs font-bold text-gray-800 bg-purple-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-2 py-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-200"
                >
                  이용약관
                </Link>
                <span className="text-xs font-black text-gray-800">|</span>
                <Link
                  href="/privacy"
                  className="text-xs font-bold text-gray-800 bg-blue-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-2 py-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-200"
                >
                  개인정보처리방침
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 items-center">
              <a
                href="https://www.youtube.com/@%EB%B0%B0%EC%9B%80%EC%9D%98%EB%8B%AC%EC%9D%B8-p5v"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-red-500 bg-white text-red-500 font-black text-xs uppercase tracking-wide shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-red-500 hover:text-white hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-200"
              >
                <Youtube className="h-4 w-4" />
                <span className="hidden sm:inline">배움의 달인</span>
              </a>
              <a
                href="https://open.kakao.com/o/gubGYQ7g"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-yellow-500 bg-white text-yellow-600 font-black text-xs uppercase tracking-wide shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-500 hover:text-white hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-200 transform -rotate-1"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">개발자 연락</span>
              </a>
              </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// 페이지 레벨에서 동적 메타데이터를 사용하지 않습니다 (클라이언트 컴포넌트)
