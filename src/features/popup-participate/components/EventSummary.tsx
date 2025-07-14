import type { EventData } from '@/types/popup';
import { formatDate } from '@/utils/dateformatter';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Image } from '@heroui/react';
import NextImage from 'next/image';

interface EventSummaryProps {
  event: EventData;
}

export default function EventSummary({ event }: EventSummaryProps) {
  //TODO: 애도 수정해야함
  const imgSrc = Array.isArray(event.thumbnail) ? event.thumbnail[0] : event.thumbnail;
  const place = event?.address?.split(',').map((s: string) => s.trim())[1];

  return (
    <section className="flex flex-col space-y-4">
      <h1 className="text-center text-3xl font-bold">{event.title}</h1>
      <div className="relative mx-auto">
        <Image
          isZoomed
          as={NextImage}
          alt="Card background"
          className="z-0 aspect-[4/5] w-full object-cover"
          src={imgSrc}
          radius="none"
          width={240}
          height={300}
          loading="eager"
        />
      </div>
      {/* 일시 */}
      <div id="defaultSt" className="mb-4">
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-8 w-8 items-center overflow-hidden rounded border-none">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
          </div>
          <p className="text-sm text-gray-500">
            {formatDate(event.eventStart)} ~ {formatDate(event.eventEnd)}
          </p>
        </div>
        {/* 장소 */}
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-8 w-8 items-center overflow-hidden rounded border-none">
            <MapPinIcon className="h-5 w-5 text-gray-500" />
          </div>
          <p className="text-sm text-gray-500">{place}</p>
        </div>
      </div>
    </section>
  );
}
