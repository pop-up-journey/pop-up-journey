import CardComponent from '@/components/common/card';
import type { EventData } from '@/types/event';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SwiperPopupListProps {
  events: EventData[];
  isSaved: (id: number) => boolean;
  onToggleSave: (id: number) => void;
}

export function SwiperPopupList({ events, isSaved, onToggleSave }: SwiperPopupListProps) {
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
      {events.map((popup) => (
        <SwiperSlide key={popup.id} className="min-w-0">
          <CardComponent {...popup} isSaved={isSaved(popup.id)} onToggleSave={onToggleSave} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
