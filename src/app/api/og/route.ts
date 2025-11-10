import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'TeaBoard Forms - AI 기반 퀴즈 및 설문 생성기로 업무 시간을 90% 절감하세요'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export async function GET() {
  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fef3c7',
          border: '4px solid #000000',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          position: 'relative',
          boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
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
                alignItems: 'center',
                justifyContent: 'center',
              },
              children: ['TeaBoard Forms'],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: '32px',
                fontWeight: '900',
                color: '#000000',
                textAlign: 'center',
                maxWidth: '900px',
                lineHeight: '1.3',
                backgroundColor: '#fbbf24',
                border: '4px solid #000000',
                padding: '20px 28px',
                marginBottom: '40px',
                boxShadow: '6px 6px 0px rgba(0, 0, 0, 1)',
                transform: 'rotate(1deg)',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              },
              children: [
                'AI 기반 퀴즈 및 설문 생성기로',
                { type: 'br', props: {} },
                '업무 시간을 90% 절감하세요',
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                gap: '16px',
                flexDirection: 'row',
                alignItems: 'stretch',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '24px 20px',
                      backgroundColor: '#fde047',
                      border: '4px solid #000000',
                      boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
                      transform: 'rotate(-2deg)',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                          fontSize: '48px',
                          marginBottom: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                          children: ['⚡'],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
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
                      },
                          children: ['빠른 생성'],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#000000',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                          children: ['AI가 자동으로', { type: 'br', props: {} }, '퀴즈와 설문 생성'],
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '24px 20px',
                      backgroundColor: '#86efac',
                      border: '4px solid #000000',
                      boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
                      transform: 'rotate(1deg)',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                          fontSize: '48px',
                          marginBottom: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                          children: ['🎯'],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
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
                      },
                          children: ['정확한 분석'],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#000000',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                          children: ['Gemini AI 기반', { type: 'br', props: {} }, '스마트 문항 생성'],
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '24px 20px',
                      backgroundColor: '#93c5fd',
                      border: '4px solid #000000',
                      boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
                      transform: 'rotate(-1deg)',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                          fontSize: '48px',
                          marginBottom: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                          children: ['📊'],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
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
                      },
                          children: ['즉시 배포'],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#000000',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                          children: ['Google Forms로', { type: 'br', props: {} }, '바로 내보내기'],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 24px',
                backgroundColor: '#ffffff',
                border: '4px solid #000000',
                boxShadow: '4px 4px 0px rgba(0, 0, 0, 1)',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                        fontSize: '18px',
                        fontWeight: '900',
                        color: '#000000',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    children: ['forms.teaboard.link'],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      ...size,
    }
  )
}