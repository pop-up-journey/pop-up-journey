import EventParticipationPage from '@/_pages/EventParticipatePage';
import { clientApi } from '@/libs/api';
import { EventData } from '@/types/event';

interface Props {
  params: Promise<{ eventId: string }>;
}

export default async function WrapperEventParticipatePage({ params }: Props) {
  const { eventId } = await params;
  const event = await clientApi<EventData>(`/api/events/${eventId}`, { method: 'GET' });

  return <EventParticipationPage event={event} />;
}
