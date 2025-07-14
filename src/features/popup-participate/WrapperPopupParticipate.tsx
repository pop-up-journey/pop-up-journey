'use client';

import type { EventData } from '@/types/popup';

import FloatingBundle from '@/components/common/floating/FloatingBundle';
import EventSummary from '@/features/popup-participate/components/EventSummary';
import ParticipateForm from '@/features/popup-participate/components/ParticipateForm';

// TODO: 중복신청시 어떻게 할지.(가능/불가능), zod로 db에 넘어가는 건 막아놓긴 했는데 토스트를 띄워준다던가 하는 처리를 해줘야함.
// 추후 유정님 작업하신거 끝나면 interface 삭제해도 될 듯

interface Props {
  event: EventData;
}

export default function WrapperPopupParticipate({ event }: Props) {
  const eventId = event.id;
  return (
    <>
      <main>
        <FloatingBundle />
        <EventSummary event={event} />
        <ParticipateForm eventId={eventId} />
      </main>
    </>
  );
}
