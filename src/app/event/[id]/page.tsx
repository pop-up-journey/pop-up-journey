import { formatDate } from '@/utils/dateformatter';
import { BanknotesIcon, MapPinIcon } from '@heroicons/react/24/outline'; // Importing icons if needed
import { Divider } from '@heroui/react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
// import Image from 'next/image';

import { Image } from '@heroui/image';
import NextImage from 'next/image';
import { notFound } from 'next/navigation';
import Chip from '../../../components/common/chip';
import { upcomingPopupList } from '../../../mock/mockdata';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const popup = upcomingPopupList.find((p) => p.id === Number(id));
  if (!popup) return notFound();

  const start = popup.event_start;
  const month = format(start, 'M', { locale: ko });
  const day = format(start, 'd', { locale: ko });

  return (
    <section>
      <div className="mb-6 flex justify-center">
        <Image
          isBlurred
          as={NextImage}
          src={typeof popup.thumbnail === 'string' ? popup.thumbnail : popup.thumbnail.src}
          alt={popup.title}
          width={400}
          height={500}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {popup.tags.map((tag, index) => (
          <Chip key={index}>{tag}</Chip>
        ))}
      </div>
      <strong className="my-2 block text-3xl drop-shadow-lg">{popup.title}</strong> <Divider className="my-4" />
      <div className="mb-2 flex items-center gap-4">
        <div className="flex h-8 w-8 flex-col overflow-hidden rounded border text-center shadow-sm">
          <div className="bg-gray-600/30 py-[2px] text-[8px] leading-none text-gray-500">{month}월</div>
          <div className="bg-transparent py-[1px] text-xs font-semibold text-black">{day}</div>
        </div>

        <p className="text-sm text-gray-500">
          {formatDate(popup.event_start)} ~ {formatDate(popup.event_end)}
        </p>
      </div>
      <div className="mb-2 flex flex-row items-center gap-4">
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded border-none">
          <MapPinIcon className="h-5 w-5 text-gray-500" />
        </div>
        <p className="text-sm text-gray-500">{popup.region}</p>
      </div>
      <div className="mb-2 flex flex-row items-center gap-4">
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded border-none">
          <BanknotesIcon className="h-5 w-5 text-gray-500" />
        </div>
        <p className="text-sm text-gray-500">무료</p>
      </div>
      {/* <p className="text-sm text-gray-500">{popup.organizer}</p> */}
      <Divider className="my-4" />
      <div className="mb-4">
        <p className="mb-2 text-lg font-semibold">이벤트 소개</p>
        {/* Glassmorphic Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-lg">
          {/* Glossy Sheen */}
          <div className="pointer-events-none absolute top-0 left-0 h-2 w-full animate-pulse bg-gradient-to-b from-white/50 to-transparent" />

          {/* 실제 본문 */}
          <p className="relative text-sm leading-relaxed text-gray-800">{popup.body}</p>
        </div>{' '}
      </div>
    </section>
  );
}
