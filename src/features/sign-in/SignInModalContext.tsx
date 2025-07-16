'use client';

import { SocialSignInButtonList } from '@/features/sign-in/components/SocialSignInButton';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import React, { createContext, useContext } from 'react';

type SignInModalContextType = {
  open: () => void;
};

const SignInModalContext = createContext<SignInModalContextType | null>(null);

export const SignInModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <SignInModalContext.Provider value={{ open: onOpen }}>
      {children}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(_onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center font-semibold">
                팝업의 여정에 오신 것을 환영합니다!
              </ModalHeader>
              <h2 className="p-4 text-center">아래에서 로그인 또는 가입하세요.</h2>
              <ModalBody>
                <SocialSignInButtonList />
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </SignInModalContext.Provider>
  );
};

export function useSignInModal() {
  const { open } = useContext(SignInModalContext)!;
  return { open };
}
