import CardComponent from '@/components/common/card';
import type { Popup } from '@/types/popup';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SwiperPopupListProps {
  events: Popup[];
  maxLimit?: number;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
}

export function SwiperPopupList({ events, maxLimit = 8, isSaved, onToggleSave }: SwiperPopupListProps) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      breakpoints={{
        '@0.00': { slidesPerView: 1.5, spaceBetween: 10 },
        '@0.75': { slidesPerView: 2.5, spaceBetween: 20 },
        '@1.00': { slidesPerView: 3.5, spaceBetween: 30 },
        '@1.50': { slidesPerView: 4.5, spaceBetween: 40 },
      }}
    >
      {events.slice(0, maxLimit).map((popup) => (
        <SwiperSlide key={popup.id} className="min-w-0">
          <CardComponent {...popup} isSaved={isSaved(popup.id)} onToggleSave={onToggleSave} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
