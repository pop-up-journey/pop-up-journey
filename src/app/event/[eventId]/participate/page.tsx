import EventParticipationPage from '@/_pages/EventParticipatePage';
import { clientApi } from '@/libs/api';
import { EventData } from '@/types/event';

interface Props {
  params: Promise<{ eventId: string }>;
}

export default async function WrapperEventParticipatePage({ params }: Props) {
  const { eventId } = await params;
  console.log(eventId);
  const event = await clientApi<EventData>(`/api/events/${eventId}`, { method: 'GET' });
  console.log(event);

  return <EventParticipationPage event={event} />;
}
