'use client';

import RegisterForm from '@/features/popup-register/components/RegisterForm';
import type { Session } from 'next-auth';

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
