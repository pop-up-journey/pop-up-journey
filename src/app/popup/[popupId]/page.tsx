import { getEventById } from '@/features/popup-detail/api/getEventById';
import { getHostByEventId } from '@/features/popup-detail/api/getHostByEventId';
import WrapperPopupDetail from '@/features/popup-detail/WrapperPopupDetail';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;

  const event = await getEventById(eventId);
  if (!event) notFound();

  const host = await getHostByEventId(event.hostId);
  if (!host) notFound();

  return <WrapperPopupDetail event={event} host={host} />;
}
