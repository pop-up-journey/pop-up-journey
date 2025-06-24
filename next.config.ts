import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['heroui.com', 'app.requestly.io', 'ocrdyvzgekumeppeqhib.supabase.co'], // 외부 이미지 도메인 허용
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
