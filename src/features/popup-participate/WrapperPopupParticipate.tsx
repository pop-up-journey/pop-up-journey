'use client';

import type { Popup } from '@/types/popup';

import FloatingBundle from '@/components/common/floating/FloatingBundle';
import ParticipateForm from '@/features/popup-participate/components/ParticipateForm';
import PopupSummary from '@/features/popup-participate/components/PopupSummary';

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
