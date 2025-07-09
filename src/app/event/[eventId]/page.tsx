import EventDetailPage from '@/_pages/EventDetailPage';
import { getEventById } from '@/features/event/detail/services/getEventById';
import { getHostByEventId } from '@/features/event/detail/services/getHostByEventId';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ eventId: string }>;
}

export default async function Page({ params }: Props) {
  const { eventId } = await params;

  const event = await getEventById(eventId);
  if (!event) notFound();

  const host = await getHostByEventId(event.hostId);
  if (!host) notFound();

  return <EventDetailPage event={event} host={host} />;
}
