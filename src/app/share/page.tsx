import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({ searchParams }: { searchParams?: Promise<Record<string, string>> }): Promise<Metadata> {
  const sp = ((await searchParams) ?? {})
  const title = sp.title || 'Teaboard Forms - AI 기반 구글폼 자동 생성'
  const description = sp.desc || 'AI를 활용하여 퀴즈와 설문을 자동으로 생성하고 구글 폼으로 즉시 배포하세요.'
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://forms.teaboard.link'
  const img = `${base}/api/og?title=${encodeURIComponent(sp.title || 'Teaboard Forms')}&desc=${encodeURIComponent(description)}`

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: `${base}/share`,
      title,
      description,
      siteName: 'Teaboard Forms',
      images: [{ url: img, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [img],
    },
  }
}

export default function ShareLanding() {
  const home = process.env.NEXT_PUBLIC_SITE_URL || 'https://forms.teaboard.link'
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-black">공유 준비 완료</h1>
        <p className="text-gray-600">이 페이지는 SNS 공유용 메타데이터를 제공합니다.</p>
        <Link href={home} className="underline text-blue-600">홈으로 이동</Link>
      </div>
    </div>
  )
}
