import { clientApi } from '@/libs/api';

export const deleteUser = async (userId: string): Promise<{ success: boolean; error?: any }> => {
  try {
    await clientApi(`/api/users/${userId}`, { method: 'DELETE' });
    return { success: true };
  } catch (error) {
    console.error('Failed to delete user:', error);
    return { success: false, error };
  }
};
