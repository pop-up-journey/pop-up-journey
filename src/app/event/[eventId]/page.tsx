import EventDetailPage from '@/_pages/EventDetailPage';
import { clientApi } from '@/libs/api';
import type { EventData } from '@/types/event';
import type { User } from '@/types/user';

interface Props {
  params: { eventId: string };
}

export default async function Page({ params }: Props) {
  const { eventId } = await params;
  const event = await clientApi<EventData>(`/api/events/${eventId}`, { method: 'GET' });
  const hostList = await clientApi<User[]>(`/api/users/${event.hostId}`, { method: 'GET' });
  const host = hostList[0];

  return <EventDetailPage event={event} host={host} />;
}
