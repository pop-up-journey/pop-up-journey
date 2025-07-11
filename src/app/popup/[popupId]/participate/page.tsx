import WrapperPopupParticipate from '@/features/popup-participate/WrapperPopupParticipate';
import { clientApi } from '@/libs/api';
import { EventData } from '@/types/event';

interface Props {
  params: Promise<{ eventId: string }>;
}

export default async function Page({ params }: Props) {
  const { eventId } = await params;
  const event = await clientApi<EventData>(`/api/events/${eventId}`, { method: 'GET' });

  return <WrapperPopupParticipate event={event} />;
}
