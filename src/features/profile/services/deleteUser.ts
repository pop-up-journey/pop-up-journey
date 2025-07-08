import { clientApi } from '@/libs/api';
import type { User } from '@/types/user';
import { signOut } from 'next-auth/react';

// TODO: 로직 분리해야됨 지금 api 요청 + alert 처리 두개를 동시에 하고 있음
export const deleteUser = async (userInfo: User) => {
  if (!confirm('정말 탈퇴하시겠습니까?')) return;

  try {
    if (userInfo) {
      await clientApi(`/api/users/${userInfo.id}`, { method: 'DELETE' });
      alert('회원 탈퇴가 완료되었습니다.');
      await signOut({ callbackUrl: '/' });
    }
  } catch (error) {
    console.error('Failed to delete user:', error);
    alert('탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};
