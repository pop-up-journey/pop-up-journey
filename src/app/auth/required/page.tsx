'use client';

import FloatingBundle from '@/components/common/floating/FloatingBundle';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSignInModal } from '../../../features/sign-in/SignInModalContext';

export default function AuthRequiredPage() {
  const router = useRouter();
  const { open: openSignInModal } = useSignInModal();

  useEffect(() => {
    // 모달 띄우기
    openSignInModal();

    // callbackUrl 로 복원
    const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '/';
    router.replace(callbackUrl);
  }, [openSignInModal, router]);

  return <FloatingBundle />;
}
