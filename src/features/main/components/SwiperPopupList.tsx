import type { EventData } from '@/types/event';
import { Swiper, SwiperSlide } from 'swiper/react';
import PopupSlideCard from './PopupSlideCard';

interface SwiperPopupListProps {
  events: EventData[];
  maxLimit?: number;
  userId?: string;
}

export function SwiperPopupList({ events, maxLimit = 8, userId }: SwiperPopupListProps) {
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
          <PopupSlideCard popup={popup} userId={userId} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
