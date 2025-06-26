'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardComponent from '../../../components/common/card';
import { upcomingPopupList } from '../../../mock/mockdata';

export default function CurrentPopupList() {
  return (
    <section className="mx-auto mb-10 max-w-6xl overflow-hidden px-4">
      <h2 className="mb-4 text-2xl font-bold">지금! 서울 인기 팝업</h2>
      {/* HACK : 애니메이션 변경 예정*/}
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3.5,
            spaceBetween: 30,
          },
          '@1.50': {
            slidesPerView: 4.5,
            spaceBetween: 40,
          },
        }}
      >
        {upcomingPopupList.map((popup) => (
          <SwiperSlide key={popup.id} className="min-w-0">
            <Link href={`/event/${popup.id}`} className="block">
              <CardComponent
                title={popup.title}
                thumbnail={popup.thumbnail}
                tags={popup.tags}
                event_start={popup.event_start}
                event_end={popup.event_end}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
