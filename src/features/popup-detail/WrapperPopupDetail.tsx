'use client';

import PopupDescription from '@/features/popup-detail/components/PopupDescription';
import PopupInfoList from '@/features/popup-detail/components/PopupInfoList';
import PopupMobileBar from '@/features/popup-detail/components/PopupMobileBar';
import PopupPoster from '@/features/popup-detail/components/PopupPoster';
import PopupTitle from '@/features/popup-detail/components/PopupTitle';
import type { Popup } from '@/types/popup';
import type { User } from '@/types/user';
import { Divider } from '@heroui/react';

interface EventDetailProps {
  popup: Popup;
  host: User;
}

export default function WrapperPopupDetail({ popup, host }: EventDetailProps) {
  const imgSrc = popup.thumbnail;

  return (
    <main>
      {/* 이미지 포스터(썸네일) */}
      <PopupPoster src={imgSrc} alt={popup.title} />
      {/* 타이틀 */}
      <PopupTitle title={popup.title} hostName={host.name} hostLink="/host-center" />
      <Divider className="my-4" />
      {/* 이벤트 정보 */}
      <PopupInfoList
        eventStart={popup.eventStart}
        eventEnd={popup.eventEnd}
        address={popup.address}
        extraInfo={popup.extraInfo}
      />
      <Divider className="my-4" />
      {/* 본문 */}
      <PopupDescription description={popup.description} />
      {/* 1024px 미만 반응형: 하단 바 */}
      <PopupMobileBar eventId={popup.id} />
    </main>
  );
}
