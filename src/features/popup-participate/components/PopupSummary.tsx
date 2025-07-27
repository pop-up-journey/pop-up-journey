import type { Popup } from '@/types/popup';
import { extractCity } from '@/utils/addressFormatter';
import { formatDate } from '@/utils/dateformatter';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Image } from '@heroui/react';
import NextImage from 'next/image';

interface PopupSummaryProps {
  popup: Popup;
}

export default function PopupSummary({ popup }: PopupSummaryProps) {
  const imgSrc = popup.thumbnail ?? undefined;
  const place = extractCity(popup?.address);

  return (
    <section className="flex flex-col space-y-4">
      <h1 className="text-center text-3xl font-bold">{popup.title}</h1>
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

      <div id="defaultSt" className="mb-4">
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-8 w-8 items-center overflow-hidden rounded border-none">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
          </div>
          <p className="text-sm text-gray-500">
            {formatDate(popup.eventStart)} ~ {formatDate(popup.eventEnd)}
          </p>
        </div>

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
