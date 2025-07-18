'use client';

import EventDescription from '@/features/popup-detail/components/EventDescription';
import EventInfoList from '@/features/popup-detail/components/EventInfoList';
import EventMobileBar from '@/features/popup-detail/components/EventMobileBar';
import EventPoster from '@/features/popup-detail/components/EventPoster';
import EventTitle from '@/features/popup-detail/components/EventTitle';
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
      <EventPoster src={imgSrc} alt={popup.title} />
      {/* 타이틀 */}
      <EventTitle title={popup.title} hostName={host.name} hostLink="/host-center" />
      <Divider className="my-4" />
      {/* 이벤트 정보 */}
      <EventInfoList
        eventStart={popup.eventStart}
        eventEnd={popup.eventEnd}
        address={popup.address}
        extraInfo={popup.extraInfo}
      />
      <Divider className="my-4" />
      {/* 본문 */}
      <EventDescription description={popup.description} />
      {/* 1024px 미만 반응형: 하단 바 */}
      <EventMobileBar eventId={popup.id} />
    </main>
  );
}
