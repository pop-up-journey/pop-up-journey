import { formatDate } from '@/utils/dateformatter';
import {
  ArrowTopRightOnSquareIcon,
  BanknotesIcon,
  ChevronDoubleRightIcon,
  HeartIcon,
  InformationCircleIcon,
  LinkIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'; // Importing icons if needed
import { Divider } from '@heroui/react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
// import Image from 'next/image';

import { Image } from '@heroui/image';
import NextImage from 'next/image';
import Link from 'next/link';
import Button from '../../../components/common/button';
import Chip from '../../../components/common/chip';
import { clientApi } from '../../../libs/api';
import { EventData } from '../../../types/event';

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const event = await clientApi<EventData>(`/api/events/${id}`, { method: 'GET' });
  const start = event.eventStart;
  const month = format(start, 'M', { locale: ko });
  const day = format(start, 'd', { locale: ko });
  const imgSrc = Array.isArray(event.thumbnail) ? event.thumbnail[0] : event.thumbnail;

  // 주소 쪼개기
  const place = event.address.split(',').map((s: string) => s.trim())[1];

  const extraInfos: string[] =
    typeof event.extraInfo === 'string'
      ? event.extraInfo
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean)
      : Array.isArray(event.extraInfo)
        ? event.extraInfo
        : [];

  return (
    <>
      <section>
        <div className="mb-6 flex justify-center">
          <Image isBlurred as={NextImage} src={imgSrc} alt={event.title} width={400} height={500} />
        </div>
        {/* 타이틀 + organizer 링크를 한 줄로 */}
        <div className="flex items-baseline space-x-3">
          <strong className="text-3xl drop-shadow-lg">{event.title}</strong>
          <Link href="/host-center" className="inline-flex items-center space-x-1 text-sm text-gray-500 lg:hidden">
            <span className="truncate font-medium">임시 호스트</span>
            <ChevronDoubleRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <Divider className="my-4" />
        <div className="mb-2 flex items-center gap-4">
          <div className="flex h-8 w-8 flex-col overflow-hidden rounded border text-center shadow-sm">
            <div className="bg-gray-600/30 py-[2px] text-[8px] leading-none text-gray-500">{month}월</div>
            <div className="bg-transparent py-[1px] text-xs font-semibold text-black">{day}</div>
          </div>

          <p className="text-sm text-gray-500">
            {formatDate(event.eventStart)} ~ {formatDate(event.eventEnd)}
          </p>
        </div>
        <div className="mb-2 flex flex-row items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded border-none">
            <MapPinIcon className="h-5 w-5 text-gray-500" />
          </div>
          <Link
            href={`http://map.kakao.com/link/search/${place}`}
            target="_blank"
            className="inline-flex items-center space-x-1 text-sm text-gray-500"
          >
            <p>{place}</p>
            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
          </Link>
        </div>
        <div className="mb-2 flex flex-row items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded border-none">
            <BanknotesIcon className="h-5 w-5 text-gray-500" />
          </div>
          <p className="text-sm text-gray-500">무료</p>
        </div>
        <div className="mb-2 flex flex-row items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded border-none">
            <InformationCircleIcon className="h-5 w-5 text-gray-500" />
          </div>
          {extraInfos.map((info, index) => (
            <Chip key={index}>{info}</Chip>
          ))}
        </div>
        <Divider className="my-4" />
        <div className="mb-14">
          <p className="mb-2 text-lg font-semibold">이벤트 소개</p>
          {/* Glassmorphic Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-lg">
            {/* Glossy Sheen */}
            <div className="pointer-events-none absolute top-0 left-0 h-2 w-full animate-pulse bg-gradient-to-b from-white/50 to-transparent" />

            {/* 실제 본문 */}
            <p className="relative text-sm leading-relaxed text-gray-800">{event.description}</p>
          </div>
        </div>
      </section>
      {/* 1024px 미만에서만 보이는 하단 고정 바 */}
      <div className="fixed inset-x-4 bottom-4 z-50 flex items-center rounded-2xl bg-white/20 p-4 shadow-xl backdrop-blur-lg lg:hidden">
        {/* 티켓 가격 */}
        <div className="flex-1 flex-shrink-0 flex-col items-center justify-center">
          <p className="text-xs text-gray-500">티켓 가격</p>
          <p className="text-lg font-semibold text-gray-800">무료</p>
        </div>

        {/* 버튼 그룹  */}
        <div className="ml-auto flex flex-1 flex-row items-center space-x-3">
          {/* 하트 */}
          <Button
            isIconOnly
            className="flex items-center justify-center rounded-lg border border-white/30 bg-white/30 shadow-2xl backdrop-blur-2xl transition hover:scale-105 dark:text-white"
          >
            <HeartIcon className="h-5 w-5 text-red-500" />
          </Button>

          {/* 링크 */}
          <Button
            isIconOnly
            className="flex items-center justify-center rounded-lg border border-white/30 bg-white/30 shadow-2xl backdrop-blur-2xl transition hover:scale-105 dark:text-white"
          >
            <LinkIcon className="h-5 w-5 text-gray-700" />
          </Button>

          {/* 신청하기 */}
          <Button className="flex-1 rounded-lg bg-gradient-to-r from-pink-400 to-blue-400 font-semibold text-white shadow-2xl backdrop-blur-2xl transition hover:scale-105 dark:text-white">
            <div className="pointer-events-none absolute top-0 left-0 h-2 w-full animate-pulse bg-gradient-to-b from-white/50 to-transparent" />
            신청하기
          </Button>
        </div>
      </div>
    </>
  );
}
