import { getEventById } from '@/features/event/detail/services/getEventById';
import { getHostByEventId } from '@/features/event/detail/services/getHostByEventId';
import type { PageProps } from '@/features/event/detail/types';
import WrapperPopupDetail from '@/features/popup-detail/WrapperPopupDetail';
import { notFound } from 'next/navigation';

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;

  const event = await getEventById(eventId);
  if (!event) notFound();

  const host = await getHostByEventId(event.hostId);
  if (!host) notFound();

  return <WrapperPopupDetail event={event} host={host} />;
}
