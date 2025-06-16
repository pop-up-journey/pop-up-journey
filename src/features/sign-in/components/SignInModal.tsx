'use client';
import { SignInButtonList } from '@/features/sign-in/components/SignInButton';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';

export default function SignInModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" variant="flat" onPress={onOpen}>
        로그인
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(_onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center font-semibold">
                팝업의 여정에 오신것을 환영합니다.
              </ModalHeader>
              <h2 className="p-4 text-center">아래에서 로그인 또는 가입 하세요.</h2>
              <ModalBody>
                <SignInButtonList />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
