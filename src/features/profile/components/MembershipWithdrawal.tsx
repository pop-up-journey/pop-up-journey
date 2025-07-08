import type { User } from '@/types/user';
import { Divider } from '@heroui/react';
import { deleteUser } from '../services/deleteUser';

interface MembershipWithdrawalProps {
  userInfo: User;
}
export default function MembershipWithdrawal({ userInfo }: MembershipWithdrawalProps) {
  const handleDeleteUser = async () => {
    await deleteUser(userInfo);
  };

  return (
    <section className="mx-auto mt-12 mb-10 pb-10">
      <Divider className="my-4" />
      <p onClick={handleDeleteUser} className="cursor-pointer text-end text-gray-500 hover:underline">
        회원을 탈퇴하고 싶으신가요?
      </p>
    </section>
  );
}
