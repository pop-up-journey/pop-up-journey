import Button from '@/components/common/button';
import type { User } from '@/types/user';
import { Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { signOut } from 'next-auth/react';
import { deleteUser } from '../services/deleteUser';

interface MembershipWithdrawalProps {
  userInfo: User;
}
export default function MembershipWithdrawal({ userInfo }: MembershipWithdrawalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDeleteUser = async () => {
    const { success } = await deleteUser(userInfo.id);
    if (success) {
      // TODO: toast(토스트) 작업 필요
      alert('회원 탈퇴가 완료되었습니다.');
      await signOut({ callbackUrl: '/' });
    } else {
      alert('탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section className="mx-auto mt-12 mb-10 pb-10">
      <Divider className="my-4" />
      <p onClick={onOpen} className="cursor-pointer text-end text-gray-500 hover:underline">
        회원을 탈퇴하고 싶으신가요?
      </p>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">회원탈퇴</ModalHeader>
              <ModalBody className="text-white">
                <p>회원탈퇴 시 모든 정보가 삭제됩니다.</p>
                <p>정말 탈퇴하시겠습니까?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleDeleteUser} size="sm" className="bg-transparent">
                  회원탈퇴
                </Button>
                <Button color="primary" onPress={onClose} size="sm">
                  취소
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
