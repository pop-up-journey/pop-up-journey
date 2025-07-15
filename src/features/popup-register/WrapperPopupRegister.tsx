'use client';

import RegisterForm from '@/features/popup-register/components/RegisterForm';

// TODO: 폼 제출이 완료된 다음에 알림 + 페이지이동(호스트센터 / 상세페이지)

export default function WrapperPopupRegister() {
  return (
    <>
      {/* <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="lazyOnload" /> */}
      <main className="container mx-auto min-h-screen items-center justify-center p-8">
        <RegisterForm />
      </main>
    </>
  );
}
