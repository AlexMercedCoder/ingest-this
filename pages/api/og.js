import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'IngestThis Blog';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: '#1e293b',
          background: '#f8fafc',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
          border: '20px solid #0f766e'
        }}
      >
        <div style={{ color: '#0f766e', fontSize: 40, marginBottom: 20, fontWeight: 'bold' }}>IngestThis</div>
        <div style={{ padding: '0 40px', lineHeight: 1.2 }}>{title}</div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}
