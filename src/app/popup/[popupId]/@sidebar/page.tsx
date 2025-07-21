import { getHostIdByPopupId } from '@/features/popup-detail/api/getHostIdByPopupId';
import { getPopupById } from '@/features/popup-detail/api/getPopupById';
import WrapperSidebar from '@/features/popup-detail/components/sidebar/WrapperSidebar';
import { extractCity } from '@/utils/addressFormatter';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ popupId: string }> }) {
  const { popupId } = await params;
  // 이벤트 조회
  const event = await getPopupById(popupId);
  const host = event && (await getHostIdByPopupId(event.hostId));
  if (!event || !host) return notFound();

  return <WrapperSidebar address={extractCity(event.address)} organizer={host.name} />;
}
