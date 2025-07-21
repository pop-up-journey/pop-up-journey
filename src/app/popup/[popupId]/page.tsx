import { getHostIdByPopupId } from '@/features/popup-detail/api/getHostIdByPopupId';
import { getPopupById } from '@/features/popup-detail/api/getPopupById';
import { createPopupView } from '@/features/popup-detail/services/popupViewHandler';
import WrapperPopupDetail from '@/features/popup-detail/WrapperPopupDetail';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ popupId: string }> }) {
  const { popupId } = await params;
  const popup = await getPopupById(popupId);

  if (!popup) notFound();

  const host = await getHostIdByPopupId(popup.hostId);
  if (!host) notFound();

  const cookieStore = await cookies();
  const visitorId = cookieStore.get('popup_journey_visitor')?.value;

  if (visitorId) {
    // NOTE: 조회수 기록을 백그라운드에서 처리
    createPopupView(popupId, visitorId).catch((error: unknown) => {
      console.error('Failed to record popup view:', error);
    });
  }

  return <WrapperPopupDetail popup={popup} host={host} />;
}
