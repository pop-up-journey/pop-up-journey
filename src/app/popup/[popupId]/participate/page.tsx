import WrapperPopupParticipate from '@/features/popup-participate/WrapperPopupParticipate';
import { clientApi } from '@/libs/api';
import { Popup } from '@/types/popup';

interface Props {
  params: Promise<{ popupId: string }>;
}

export default async function Page({ params }: Props) {
  const { popupId } = await params;
  const event = await clientApi<Popup>(`/api/events/${popupId}`, { method: 'GET' });

  return <WrapperPopupParticipate event={event} />;
}
