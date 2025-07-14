import WrapperPopupParticipate from '@/features/popup-participate/WrapperPopupParticipate';
import { clientApi } from '@/libs/api';
import { EventData } from '@/types/popup';

interface Props {
  params: Promise<{ popupId: string }>;
}

export default async function Page({ params }: Props) {
  const { popupId } = await params;
  const event = await clientApi<EventData>(`/api/events/${popupId}`, { method: 'GET' });

  return <WrapperPopupParticipate event={event} />;
}
