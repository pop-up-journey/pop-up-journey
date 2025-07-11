import EventMapPanel from '@/features/event/detail/components/EventMapPanel';
import { getEventById } from '@/features/event/detail/services/getEventById';
import { getHostByEventId } from '@/features/event/detail/services/getHostByEventId';
import type { PageProps } from '@/features/event/detail/types';
import { getAddressPart } from '@/utils/adress';
import { notFound } from 'next/navigation';

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;
  // 이벤트 조회
  const event = await getEventById(eventId);
  if (!event) return notFound();
  // 호스트 조회
  const host = await getHostByEventId(event.hostId);
  if (!host) return notFound();
  // 주소 parsing
  const place = getAddressPart(event.address!, 1);

  return (
    <div className="mb-10 flex flex-col gap-4">
      <EventMapPanel address={place} organizer={host.name} />
    </div>
  );
}
