import { getEventById } from '@/features/popup-detail/api/getEventById';
import { getHostByEventId } from '@/features/popup-detail/api/getHostByEventId';
import WrapperPopupDetail from '@/features/popup-detail/WrapperPopupDetail';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ popupId: string }> }) {
  const { popupId } = await params;
  const popups = await getEventById(popupId);
  if (!popups) notFound();
  const host = await getHostByEventId(popups.hostId);
  if (!host) notFound();

  return <WrapperPopupDetail popups={popups} host={host} />;
}
