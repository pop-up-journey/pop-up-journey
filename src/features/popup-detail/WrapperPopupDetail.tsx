'use client';

import EventDescription from '@/features/popup-detail/components/EventDescription';
import EventInfoList from '@/features/popup-detail/components/EventInfoList';
import EventMobileBar from '@/features/popup-detail/components/EventMobileBar';
import EventPoster from '@/features/popup-detail/components/EventPoster';
import EventTitle from '@/features/popup-detail/components/EventTitle';
import type { EventData } from '@/types/popup';
import type { User } from '@/types/user';
import { Divider } from '@heroui/react';

interface EventDetailProps {
  event: EventData;
  host: User;
}

export default function WrapperPopupDetail({ event, host }: EventDetailProps) {
  // TODO: 섬네일은 string값임 array 아님
  const imgSrc = Array.isArray(event.thumbnail) ? event.thumbnail[0] : event.thumbnail;

  return (
    <main>
      {/* 이미지 포스터(썸네일) */}
      <EventPoster src={imgSrc} alt={event.title} />
      {/* 타이틀 */}
      <EventTitle title={event.title} hostName={host.name} hostLink="/host-center" />
      <Divider className="my-4" />
      {/* 이벤트 정보 */}
      <EventInfoList
        eventStart={event.eventStart}
        eventEnd={event.eventEnd}
        address={event.address}
        extraInfo={event.extraInfo}
      />
      <Divider className="my-4" />
      {/* 본문 */}
      <EventDescription description={event.description} />
      {/* 1024px 미만 반응형: 하단 바 */}
      {/* TODO: 관심토글 기능 구현해야함 */}
      <EventMobileBar priceLabel="무료" eventId={event.id} />
    </main>
  );
}
