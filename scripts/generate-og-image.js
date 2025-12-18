import { writeFileSync } from 'fs';
import { ImageResponse } from '@vercel/og';

async function generateOGImage() {
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
          }}
        >
          forms.teaboard.link
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

// Generate the image
generateOGImage()
  .then((response) => response.arrayBuffer())
  .then((buffer) => {
    writeFileSync('public/opengraph-image.png', Buffer.from(buffer));
    console.log('✅ Neo-Brutalism OG 이미지가 생성되었습니다!');
  })
  .catch(console.error);