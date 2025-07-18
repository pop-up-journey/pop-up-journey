import { clientApi } from '@/libs/api';
import { addToast } from '@heroui/react';

export const toggleSavedPopup = async (eventId: string, userId: string, save: boolean) => {
  try {
    clientApi(`/api/like/${eventId}`, {
      method: save ? 'POST' : 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    addToast({
      title: save ? '관심 팝업 저장 완료!' : '관심 팝업 삭제 완료!',
      color: 'success',
    });
  } catch (error) {
    console.error(error);
    addToast({
      title: '관심 팝업 오류 발생! 다시 시도해주세요.',
      color: 'danger',
    });
  }
};
