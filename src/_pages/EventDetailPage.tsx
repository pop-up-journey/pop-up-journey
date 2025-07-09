'use client';

import EventDescription from '@/features/event/detail/components/EventDescription';
import EventInfoList from '@/features/event/detail/components/EventInfoList';
import EventMobileBar from '@/features/event/detail/components/EventMobileBar';
import type { EventData } from '@/types/event';
import type { User } from '@/types/user';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { Divider, Image } from '@heroui/react';
import NextImage from 'next/image';
import Link from 'next/link';

interface EventDetailProps {
  event: EventData;
  host: User;
}

export default function EventDetailPage({ event, host }: EventDetailProps) {
  const imgSrc = Array.isArray(event.thumbnail) ? event.thumbnail[0] : event.thumbnail;

  return (
    // NOTE: 시맨틱하게 바꿀 수 있는 요소들 리팩토링 필요
    <>
      <section>
        {/* 이미지 포스터(썸네일) */}
        <div className="mb-6 flex justify-center">
          <Image isBlurred as={NextImage} src={imgSrc} alt={event.title} width={400} height={500} />
        </div>
        {/* 타이틀 */}
        <div className="flex items-baseline space-x-3">
          <strong className="text-3xl drop-shadow-lg">{event.title}</strong>
          {/* 1024px 미만 반응형: 주최자명 */}
          <Link href="/host-center" className="inline-flex items-center space-x-1 text-sm text-gray-500 lg:hidden">
            <span className="truncate font-medium">{host.name}</span>
            <ChevronDoubleRightIcon className="h-4 w-4" />
          </Link>
        </div>
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
      </section>
      {/* 1024px 미만 반응형: 하단 바 */}
      {/* TODO: 관심토글 기능 구현해야함 */}
      <EventMobileBar priceLabel="무료" eventId={event.id} />
    </>
  );
}
