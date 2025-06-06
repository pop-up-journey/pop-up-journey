'use client';
import SignInButton from '@/features/sign-in/components/SignInButton';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function SignInModal() {
  const router = useRouter();

  return (
    <Modal defaultOpen backdrop="opaque" onOpenChange={() => router.back()}>
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
  );
}
