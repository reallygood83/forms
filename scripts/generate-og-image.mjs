import { writeFileSync } from 'fs';
import { ImageResponse } from '@vercel/og';

async function generateOGImage() {
  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fef3c7',
          border: '4px solid #000000',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
        }}
      >
        {/* Logo with Neo-Brutalism style */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: '900',
            color: '#000000',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: '1.1',
            backgroundColor: '#ffffff',
            border: '4px solid #000000',
            padding: '20px 32px',
            boxShadow: '6px 6px 0px rgba(0, 0, 0, 1)',
            transform: 'rotate(-1deg)',
          }}
        >
          TeaBoard Forms
        </div>

        {/* Main tagline with rotation */}
        <div
          style={{
            fontSize: '32px',
            color: '#000000',
            fontWeight: '900',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: '1.3',
            backgroundColor: '#fbbf24',
            border: '4px solid #000000',
            padding: '20px 28px',
            boxShadow: '6px 6px 0px rgba(0, 0, 0, 1)',
            transform: 'rotate(1deg)',
            marginBottom: '40px',
          }}
        >
          AI 기반 퀴즈 및 설문 생성기로
          <br />
          업무 시간을 90% 절감하세요
        </div>

        {/* Features with Neo-Brutalism cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          {/* 빠른 생성 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 20px',
              backgroundColor: '#fde047',
              border: '4px solid #000000',
              boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
              transform: 'rotate(-2deg)',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ⚡
            </div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: '900',
                color: '#000000',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              빠른 생성
            </div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#000000',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              AI가 자동으로
              <br />
              퀴즈와 설문 생성
            </div>
          </div>

          {/* 정확한 분석 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 20px',
              backgroundColor: '#86efac',
              border: '4px solid #000000',
              boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
              transform: 'rotate(1deg)',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              🎯
            </div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: '900',
                color: '#000000',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              정확한 분석
            </div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#000000',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Gemini AI 기반
              <br />
              스마트 문항 생성
            </div>
          </div>

          {/* 즉시 배포 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 20px',
              backgroundColor: '#93c5fd',
              border: '4px solid #000000',
              boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
              transform: 'rotate(-1deg)',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              📊
            </div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: '900',
                color: '#000000',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              즉시 배포
            </div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#000000',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Google Forms로
              <br />
              바로 내보내기
            </div>
          </div>
        </div>

        {/* URL footer with Neo-Brutalism style */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 24px',
            backgroundColor: '#ffffff',
            border: '4px solid #000000',
            boxShadow: '4px 4px 0px rgba(0, 0, 0, 1)',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              fontWeight: '900',
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            forms.teaboard.link
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );

  const imageBuffer = await imageResponse.arrayBuffer();
  writeFileSync('public/opengraph-image.png', Buffer.from(imageBuffer));
  console.log('✅ Neo-Brutalism OG 이미지가 public/opengraph-image.png에 성공적으로 생성되었습니다!');
}

generateOGImage().catch(console.error);
