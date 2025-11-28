import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const contentType = 'image/png'

export async function generateImageMetadata() {
  return [
    { id: '16', size: { width: 16, height: 16 } },
    { id: '32', size: { width: 32, height: 32 } },
    { id: '64', size: { width: 64, height: 64 } },
  ]
}

export default function Icon({ id }: { id: string }) {
  const size = id === '64' ? 64 : id === '32' ? 32 : 16

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          borderRadius: size / 4,
          border: `${Math.max(1, Math.floor(size / 16))}px solid #000000`,
        }}
      >
        <span
          style={{
            fontSize: Math.floor(size * 0.6),
            fontWeight: 900,
            color: '#000000',
          }}
        >
          TF
        </span>
      </div>
    ),
    { width: size, height: size }
  )
}

