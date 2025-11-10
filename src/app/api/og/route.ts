import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'TeaBoard Forms - AI 기반 퀴즈 및 설문 생성기로 업무 시간을 90% 절감하세요'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#fef3c7',
          border: '4px solid #000000',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          position: 'relative',
          boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            fontWeight: '900',
            color: '#000000',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            backgroundColor: '#ffffff',
            border: '4px solid #000000',
            padding: '16px 24px',
            boxShadow: '6px 6px 0px rgba(0, 0, 0, 1)',
            transform: 'rotate(-1deg)',
          }}
        >
          TeaBoard Forms
        </div>

        <div
          style={{
            fontSize: '28px',
            fontWeight: '900',
            color: '#000000',
            textAlign: 'center',
            backgroundColor: '#fbbf24',
            border: '4px solid #000000',
            padding: '16px 20px',
            marginBottom: '32px',
            boxShadow: '6px 6px 0px rgba(0, 0, 0, 1)',
            transform: 'rotate(1deg)',
          }}
        >
          AI 기반 퀴즈 및 설문 생성기로
          <br />
          업무 시간을 90% 절감하세요
        </div>

        <div
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#fde047',
              border: '4px solid #000000',
              boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
              transform: 'rotate(-2deg)',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚡</div>
            <div style={{ fontSize: '16px', fontWeight: '900' }}>빠른 생성</div>
            <div style={{ fontSize: '12px', textAlign: 'center' }}>AI가 자동으로<br/>퀴즈와 설문 생성</div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#86efac',
              border: '4px solid #000000',
              boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
              transform: 'rotate(1deg)',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</div>
            <div style={{ fontSize: '16px', fontWeight: '900' }}>정확한 분석</div>
            <div style={{ fontSize: '12px', textAlign: 'center' }}>Gemini AI 기반<br/>스마트 문항 생성</div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#93c5fd',
              border: '4px solid #000000',
              boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
              transform: 'rotate(-1deg)',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
            <div style={{ fontSize: '16px', fontWeight: '900' }}>즉시 배포</div>
            <div style={{ fontSize: '12px', textAlign: 'center' }}>Google Forms로<br/>바로 내보내기</div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            fontSize: '16px',
            fontWeight: '900',
            backgroundColor: '#ffffff',
            border: '4px solid #000000',
            padding: '8px 16px',
            textTransform: 'uppercase',
            boxShadow: '4px 4px 0px rgba(0, 0, 0, 1)',
          }}
        >
          forms.teaboard.link
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}