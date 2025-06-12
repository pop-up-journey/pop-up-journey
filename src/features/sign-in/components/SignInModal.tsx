'use client';
import { SignInButtonList } from '@/features/sign-in/components/SignInButton';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function SignInModal() {
  const router = useRouter();

  return (
    <section aria-label="sign-in-modal">
      <Modal defaultOpen backdrop="opaque" onOpenChange={() => router.back()}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-center font-semibold">
              팝업의 여정에 오신것을 환영합니다.
            </ModalHeader>
            <h2 className="p-4 text-center">아래에서 로그인 또는 가입 하세요.</h2>

            <ModalBody>
              <SignInButtonList />
            </ModalBody>
            <ModalFooter />
          </>
        </ModalContent>
      </Modal>
    </section>
  );
}
