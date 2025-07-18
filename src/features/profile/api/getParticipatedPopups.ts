import { clientApi } from '@/libs/api';
import type { Popup } from '@/types/popup';

export interface ParticipatedPopup extends Popup {
  participantId: string;
  participantStatus: string;
  tickets: number;
}

export async function getParticipatedPopups(userId: string): Promise<ParticipatedPopup[]> {
  try {
    return await clientApi(`/api/users/${userId}/participate`, { method: 'GET' });
  } catch (error) {
    console.error('Failed to get participated popups', error);
    return [];
  }
}
