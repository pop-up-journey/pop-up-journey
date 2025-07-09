'use client';

import Button from '@/components/common/button';
import EventDescription from '@/features/event/detail/components/EventDescription';
import EventInfoList from '@/features/event/detail/components/EventInfoList';
import ShareButton from '@/features/event/detail/components/ShareButton';
import type { EventData } from '@/types/event';
import type { User } from '@/types/user';
import { ChevronDoubleRightIcon, HeartIcon } from '@heroicons/react/24/outline';
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
      <div className="fixed inset-x-4 bottom-4 z-50 flex items-center rounded-2xl bg-white/20 p-4 shadow-xl backdrop-blur-lg lg:hidden">
        {/* 가격 정보 */}
        <div className="flex-1 flex-shrink-0 flex-col items-center justify-center">
          <p className="text-xs text-gray-500">티켓 가격</p>
          <p className="text-lg font-semibold text-gray-800">무료</p>
        </div>
        {/* 버튼 그룹  */}
        <div className="ml-auto flex flex-1 flex-row items-center space-x-3">
          {/* 관심 팝업(하트) */}
          <Button
            isIconOnly
            className="flex items-center justify-center rounded-lg border border-white/30 bg-white/30 shadow-2xl backdrop-blur-2xl transition hover:scale-105 dark:text-white"
          >
            <HeartIcon className="h-5 w-5 text-red-500" />
          </Button>
          {/* 링크 공유 */}
          <ShareButton />
          {/* 신청 버튼 */}
          <Link href={`/event/${event.id}/participate`}>
            <Button className="flex-1 rounded-lg bg-gradient-to-r from-pink-400 to-blue-400 font-semibold text-white shadow-2xl backdrop-blur-2xl transition hover:scale-105 dark:text-white">
              <div className="pointer-events-none absolute top-0 left-0 h-2 w-full animate-pulse bg-gradient-to-b from-white/50 to-transparent" />
              신청하기
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
