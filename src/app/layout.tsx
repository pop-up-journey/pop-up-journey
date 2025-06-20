import Header from '@/components/layouts/header';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Providers } from '../providers/Providers';
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={` ${pretendard.variable} antialiased`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
