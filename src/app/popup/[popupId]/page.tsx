import { getEventById } from '@/features/popup-detail/api/getEventById';
import { getHostByEventId } from '@/features/popup-detail/api/getHostByEventId';
import WrapperPopupDetail from '@/features/popup-detail/WrapperPopupDetail';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ popupId: string }> }) {
  const { popupId } = await params;
  const popup = await getEventById(popupId);
  if (!popup) notFound();
  const host = await getHostByEventId(popup.hostId);
  if (!host) notFound();

  return <WrapperPopupDetail popup={popup} host={host} />;
}
