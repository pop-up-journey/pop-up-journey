import { getEventById } from '@/features/popup-detail/api/getEventById';
import { getHostByEventId } from '@/features/popup-detail/api/getHostByEventId';
import EventMapPanel from '@/features/popup-detail/components/EventMapPanel';
import { getAddressPart } from '@/utils/adress';
import { notFound } from 'next/navigation';

// export default async function Page({ params }: PageProps) {
export default async function Page({ params }: { params: Promise<{ popupId: string }> }) {
  const { popupId } = await params;
  // 이벤트 조회
  const event = await getEventById(popupId);
  if (!event) return notFound();
  // 호스트 조회
  const host = await getHostByEventId(event.hostId);
  if (!host) return notFound();
  // 주소 parsing
  const place = getAddressPart(event.address!, 1);

  return (
    // TODO: 이거 div 제거 요망
    <div className="mb-10 flex flex-col gap-4">
      <EventMapPanel address={place} organizer={host.name} />
    </div>
  );
}
