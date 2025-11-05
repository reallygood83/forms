import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Teaboard Forms - AI 기반 구글폼 자동 생성';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        }}
      >
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          {/* Icon */}
          <div
            style={{
              display: 'flex',
              width: '160px',
              height: '160px',
              backgroundColor: 'white',
              borderRadius: '32px',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '48px',
              boxShadow: '0 20px 50px rgba(37, 99, 235, 0.3)',
            }}
          >
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              style={{
                fill: '#2563eb',
              }}
            >
              <rect x="20" y="10" width="60" height="80" rx="6" fill="#2563eb" />
              <rect x="30" y="25" width="40" height="5" rx="2" fill="white" />
              <rect x="30" y="40" width="40" height="5" rx="2" fill="white" />
              <rect x="30" y="55" width="40" height="5" rx="2" fill="white" />
              <circle cx="68" cy="78" r="12" fill="white" />
              <path
                d="M 64 78 L 67 81 L 72 76"
                stroke="#2563eb"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '24px',
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            Teaboard Forms
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '36px',
              color: '#94a3b8',
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            AI 기반 구글폼 자동 생성
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '48px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '24px',
                color: '#2563eb',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#2563eb',
                }}
              />
              퀴즈 자동 생성
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '24px',
                color: '#2563eb',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#2563eb',
                }}
              />
              설문조사 생성
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '24px',
                color: '#2563eb',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#2563eb',
                }}
              />
              Gemini AI 활용
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
