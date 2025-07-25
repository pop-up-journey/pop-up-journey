import type { Popup } from '@/types/popup';
import { Swiper, SwiperSlide } from 'swiper/react';
import OngoingPopupCard from './OngoingPopupCard';

interface PopupSwiperProps {
  events: Popup[];
  maxLimit?: number;
  userId?: string;
}

export function PopupSwiper({ events, maxLimit = 8, userId }: PopupSwiperProps) {
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
          <OngoingPopupCard popup={popup} userId={userId} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
