'use client';

import Button from '@/components/common/button';
import { useSignInModal } from '@/features/sign-in/SignInModalContext';
import useResizeUi from '@/hooks/useResizeUi';

export default function SignInButton() {
  const { isMdUp } = useResizeUi();
  const { open: openSignInModal } = useSignInModal();

  return (
    <Button color="primary" variant="flat" size={isMdUp ? 'md' : 'sm'} onPress={openSignInModal}>
      로그인
    </Button>
  );
}
