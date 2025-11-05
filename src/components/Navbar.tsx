'use client';

import { useSession, signOut } from 'next-auth/react';
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Menu, Sparkles, LayoutDashboard, LogOut, User, FileText } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const closeSheet = () => setIsOpen(false);

  return (
    <nav className="border-b-2 border-black bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide hover:text-gray-700 transition-colors">
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
                    className="border-2 border-black rounded-none uppercase tracking-wide font-semibold"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    대시보드
                  </Button>
                </Link>

                <Link href="/create">
                  <Button
                    variant={isActive('/create') ? 'default' : 'outline'}
                    className="border-2 border-black rounded-none uppercase tracking-wide font-semibold"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    생성하기
                  </Button>
                </Link>

                <Link
                  href="https://pebble-stallion-abb.notion.site/2a010244f99780929827c7d2201f2d98"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-none uppercase tracking-wide font-semibold"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    활용 신청
                  </Button>
                </Link>

                {/* User Menu */}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="border-2 border-black rounded-none uppercase tracking-wide font-semibold">
                        <User className="h-4 w-4 mr-2" />
                        {session.user.name?.split(' ')[0] || '사용자'}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-48 p-2 space-y-2">
                          <div className="px-3 py-2 text-sm text-gray-600 border-b border-gray-200">
                            {session.user.email}
                          </div>
                          <Button
                            variant="ghost"
                            className="w-full justify-start rounded-none uppercase tracking-wide font-semibold"
                            onClick={() => signOut()}
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            로그아웃
                          </Button>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </>
            ) : (
              <>
                <Link href="/create">
                  <Button
                    variant="outline"
                    className="border-2 border-black rounded-none uppercase tracking-wide font-semibold"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    생성하기
                  </Button>
                </Link>

                <Link
                  href="https://pebble-stallion-abb.notion.site/2a010244f99780929827c7d2201f2d98"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-none uppercase tracking-wide font-semibold"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    활용 신청
                  </Button>
                </Link>
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
