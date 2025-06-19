'use client';

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { SignInButtonList } from '../features/sign-in/components/SignInButton';

export default function SignInPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    // HACK: 애네도 컴포넌트화 시켜서 UI로 만들면 좋을거같음
    <section aria-label="sign-in-title">
      <Button onPress={onOpen}>로그인</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(_onClose) => (
            <>
              <ModalHeader className="flex-col gap-1 text-center font-semibold">
                팝업의 여정에 오신것을 환영합니다.
              </ModalHeader>
              {/* <hr /> */}
              <h2 className="p-4 text-center">아래에서 로그인 또는 가입 하세요.</h2>
              <ModalBody>
                <SignInButtonList />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
