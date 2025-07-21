import { getHostIdByPopupId } from '@/features/popup-detail/api/getHostIdByPopupId';
import { getPopupById } from '@/features/popup-detail/api/getPopupById';
import WrapperSidebar from '@/features/popup-detail/components/sidebar/WrapperSidebar';
import { getAddressPart } from '@/utils/address';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ popupId: string }> }) {
  const { popupId } = await params;
  // 이벤트 조회
  const event = await getPopupById(popupId);
  if (!event) return notFound();
  // 호스트 조회
  const host = await getHostIdByPopupId(event.hostId);
  if (!host) return notFound();
  // 주소 parsing
  const place = getAddressPart(event.address!, 1);

  return <WrapperSidebar address={place} organizer={host.name} />;
}
