// import SignInPage from '@/pages/SignInPage';

// export default function WrapperSignInPage() {
//   return <SignInPage />;
// }
'use client';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useRouter } from 'next/navigation';
import SignInButton from '../../../features/sign-in/components/SignInButton';

export default function WrapperSignInPage() {
  const router = useRouter();

  return (
    <>
      <Modal isOpen={true} backdrop="blur" onOpenChange={() => router.back()}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">로그인</ModalHeader>
            <ModalBody>
              <SignInButton provider="google" />

              <SignInButton provider="naver" />

              <SignInButton provider="kakao" />
            </ModalBody>
            <ModalFooter />
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
