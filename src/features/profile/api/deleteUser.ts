import { clientApi } from '@/libs/api';

// 회원 탈퇴 API 요청만 담당하는 함수
export const deleteUser = async (userId: string): Promise<{ success: boolean; error?: any }> => {
  try {
    await clientApi(`/api/users/${userId}`, { method: 'DELETE' });
    return { success: true };
  } catch (error) {
    console.error('Failed to delete user:', error);
    return { success: false, error };
  }
};
