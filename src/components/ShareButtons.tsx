"use client"

import { useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, Share2, Twitter, Facebook } from 'lucide-react'
import { buildShareDescription } from '@/lib/seo'

type KakaoSDK = {
  init: (key: string) => void
  isInitialized: () => boolean
  Link?: { sendDefault: (payload: unknown) => void }
}

declare global {
  interface Window {
    Kakao?: KakaoSDK
  }
}

function initKakao() {
  if (typeof window === 'undefined') return
  const key = process.env.NEXT_PUBLIC_KAKAO_APP_KEY
  if (!key) return
  if (!window.Kakao) {
    const s = document.createElement('script')
    s.src = 'https://developers.kakao.com/sdk/js/kakao.min.js'
    s.async = true
    s.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(key)
      }
    }
    document.head.appendChild(s)
  } else if (!window.Kakao.isInitialized()) {
    window.Kakao.init(key)
  }
}

export default function ShareButtons({ title }: { title?: string }) {
  useEffect(() => {
    initKakao()
  }, [])

  const shareUrl = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://forms.teaboard.link'
    const url = new URL('/share', origin)
    const desc = buildShareDescription()
    url.searchParams.set('title', title || 'Teaboard Forms')
    url.searchParams.set('desc', desc)
    return url.toString()
  }, [title])

  const ogImage = useMemo(() => {
    const u = new URL('/api/og', typeof window !== 'undefined' ? window.location.origin : 'https://forms.teaboard.link')
    u.searchParams.set('title', title || 'Teaboard Forms')
    u.searchParams.set('desc', buildShareDescription())
    return u.toString()
  }, [title])

  const onShareKakao = () => {
    try {
      if (window.Kakao?.Link) {
        window.Kakao.Link.sendDefault({
          objectType: 'feed',
          content: {
            title: title || 'Teaboard Forms',
            description: buildShareDescription(),
            imageUrl: ogImage,
            link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
          },
          buttons: [
            { title: '웹으로 보기', link: { mobileWebUrl: shareUrl, webUrl: shareUrl } },
          ],
        })
        return
      }
    } catch {}
    window.open(`https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(shareUrl)}`)
  }

  const onShareFacebook = () => {
    const u = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(u, '_blank', 'noopener,noreferrer')
  }

  const onShareTwitter = () => {
    const text = encodeURIComponent(title || 'Teaboard Forms')
    const u = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${text}`
    window.open(u, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={onShareKakao} variant="outline">
        <MessageCircle className="h-4 w-4" /> 카카오톡
      </Button>
      <Button onClick={onShareFacebook} variant="outline">
        <Facebook className="h-4 w-4" /> 페이스북
      </Button>
      <Button onClick={onShareTwitter} variant="outline">
        <Twitter className="h-4 w-4" /> 트위터
      </Button>
      <Button onClick={() => navigator.share?.({ title: title || 'Teaboard Forms', text: buildShareDescription(), url: shareUrl })}>
        <Share2 className="h-4 w-4" /> 공유
      </Button>
    </div>
  )
}
