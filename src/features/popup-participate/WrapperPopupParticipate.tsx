'use client';

import type { Popup } from '@/types/popup';

import FloatingBundle from '@/components/common/floating/FloatingBundle';
import ParticipateForm from '@/features/popup-participate/components/ParticipateForm';
import PopupSummary from '@/features/popup-participate/components/PopupSummary';

// TODO: 중복신청시 어떻게 할지.(가능/불가능), zod로 db에 넘어가는 건 막아놓긴 했는데 토스트를 띄워준다던가 하는 처리를 해줘야함.
// 추후 유정님 작업하신거 끝나면 interface 삭제해도 될 듯

export default function WrapperPopupParticipate({ popup }: { popup: Popup }) {
  const popupId = popup.id;
  return (
    <>
      <main>
        <FloatingBundle />
        <PopupSummary popup={popup} />
        <ParticipateForm popupId={popupId} />
      </main>
    </>
  );
}
