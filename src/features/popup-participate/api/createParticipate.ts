import { clientApi } from '@/libs/api';
import { addToast } from '@heroui/react';

interface ParticipateDTO {
  name: string;
  email: string;
  phone: string;
  tickets: number;
}

export const createParticipate = async ({ name, email, phone, tickets }: ParticipateDTO, eventId: string) => {
  try {
    const res = await clientApi(`/api/events/${eventId}/participate`, {
      method: 'POST',
      body: {
        name,
        email,
        phone,
        tickets,
        participantStatus: 'pending', // TODO: default approve인듯 이건 서버에서 정해줘야될거같음
      },
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      addToast({
        title: '참여 신청이 완료되었습니다!',
        color: 'success',
      });
    }
  } catch (err) {
    console.error('신청 중 오류:', err);
    addToast({
      title: '참여 신청에 실패했습니다. 다시 시도해주세요.',
      color: 'danger',
    });
  }
};
