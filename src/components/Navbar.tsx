'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, Sparkles, LayoutDashboard, LogOut, User, FileText } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const closeSheet = () => setIsOpen(false);

  return (
    <nav className="border-b-4 border-black bg-yellow-400 shadow-[8px_0px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all bg-white border-4 border-black px-4 py-2">
              TeaBoard Forms
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {session?.user ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant={isActive('/dashboard') ? 'default' : 'outline'}
                    className="border-4 border-black rounded-none uppercase tracking-wide font-black"
                  >
                    <LayoutDashboard className="h-6 w-6 mr-3" />
                    대시보드
                  </Button>
                </Link>

                <Link href="/create">
                  <Button
                    variant={isActive('/create') ? 'default' : 'outline'}
                    className="border-4 border-black rounded-none uppercase tracking-wide font-black"
                  >
                    <Sparkles className="h-6 w-6 mr-3" />
                    생성하기
                  </Button>
                </Link>

                {/* User Info & Logout */}
                <div className="flex items-center gap-3">
                  <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span className="font-black text-sm uppercase">
                        {session.user.name?.split(' ')[0] || '사용자'}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-gray-600">
                      {session.user.email}
                    </div>
                  </div>

                  <Button
                    onClick={() => signOut()}
                    className="bg-red-400 text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px]"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/create">
                  <Button
                    variant="outline"
                    className="border-4 border-black rounded-none uppercase tracking-wide font-black"
                  >
                    <Sparkles className="h-6 w-6 mr-3" />
                    생성하기
                  </Button>
                </Link>

                <Button
                  onClick={() => signIn('google')}
                  className="bg-white text-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px]"
                >
                  Google로 로그인
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu - Hamburger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-2 border-black rounded-none"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">메뉴 열기</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] border-l-2 border-black rounded-none bg-white"
              >
                <SheetHeader className="border-b-2 border-black pb-4">
                  <SheetTitle className="text-left uppercase tracking-wide font-bold">
                    메뉴
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                  {session?.user ? (
                    <>
                      {/* User Info */}
                      <div className="px-3 py-3 border-2 border-black bg-gray-50">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="h-4 w-4" />
                          <span className="font-semibold uppercase text-sm">
                            {session.user.name?.split(' ')[0] || '사용자'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 pl-6">
                          {session.user.email}
                        </div>
                      </div>

                      {/* Menu Items */}
                      <Link href="/dashboard" onClick={closeSheet}>
                        <Button
                          variant={isActive('/dashboard') ? 'default' : 'outline'}
                          className="w-full justify-start border-2 border-black rounded-none uppercase tracking-wide font-semibold"
                        >
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          대시보드
                        </Button>
                      </Link>

                      <Link href="/create" onClick={closeSheet}>
                        <Button
                          variant={isActive('/create') ? 'default' : 'outline'}
                          className="w-full justify-start border-2 border-black rounded-none uppercase tracking-wide font-semibold"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          생성하기
                        </Button>
                      </Link>

                      <Link
                        href="https://pebble-stallion-abb.notion.site/2a010244f99780929827c7d2201f2d98"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeSheet}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-none uppercase tracking-wide font-semibold"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          활용 신청
                        </Button>
                      </Link>

                      {/* Logout */}
                      <div className="pt-4 border-t-2 border-black">
                        <Button
                          variant="outline"
                          className="w-full justify-start border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-none uppercase tracking-wide font-semibold"
                          onClick={() => {
                            closeSheet();
                            signOut();
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          로그아웃
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link href="/create" onClick={closeSheet}>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-2 border-black rounded-none uppercase tracking-wide font-semibold"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          생성하기
                        </Button>
                      </Link>

                      <Link
                        href="https://pebble-stallion-abb.notion.site/2a010244f99780929827c7d2201f2d98"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeSheet}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-none uppercase tracking-wide font-semibold"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          활용 신청
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
