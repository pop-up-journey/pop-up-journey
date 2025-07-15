'use client';

import RegisterForm from '@/features/popup-register/components/RegisterForm';
import type { Session } from 'next-auth';

// TODO: 폼 제출이 완료된 다음에 알림 + 페이지이동(호스트센터 / 상세페이지)

interface WrapperPopupRegisterProps {
  session: Session;
}

export default function WrapperPopupRegister({ session }: WrapperPopupRegisterProps) {
  const hostId = session.user!.id!;
  return (
    <>
      <main className="container mx-auto min-h-screen items-center justify-center p-8">
        <RegisterForm hostId={hostId} />
      </main>
    </>
  );
}
