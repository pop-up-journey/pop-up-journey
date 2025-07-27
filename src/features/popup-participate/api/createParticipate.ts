import { clientApi } from '@/libs/api';

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
        participantStatus: 'approved',
      },
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  } catch (err) {
    console.error('신청 중 오류:', err);
  }
};
