import ConditionalFooter from '@/components/layouts/footer';
import ConditionalHeader from '@/components/layouts/header';
import { Providers } from '@/providers/providers';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/globals.css';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

// TODO: 메타데이터 open graph, twitter ㅊard 추가하기
export const metadata: Metadata = {
  title: '팝업의 여정 ',
  description: '팝업의 여정',
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL_DEV ?? 'http://localhost:3000'),
  openGraph: {
    title: '팝업의 여정',
    description: '팝업의 여정',
    url: process.env.NEXT_PUBLIC_API_URL_DEV,
    siteName: '팝업의 여정',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: '팝업의 여정',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '팝업의 여정',
    description: '팝업의 여정',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={` ${pretendard.variable} antialiased`}>
        <Providers>
          <ConditionalHeader />
          <div className="min-h-screen"> {children}</div>
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
