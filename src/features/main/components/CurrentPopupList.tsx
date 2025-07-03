'use client';

import CardComponent from '@/components/common/card';
import { clientApi } from '@/libs/api';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-haiku';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function CurrentPopupList() {
  // HACK: 이벤트를 꼭 상태에 넣어주어야 할까. 정적으로 미리 받아와서 뿌려주는 걸로 변경해보자.
  const [events, setEvents] = useState<any[]>([]);

  const [favorites, setFavorites] = useLocalStorage<number[]>('favoritePopups', []);
  // NOTE: next.js가 기본적으로 컴포넌트를 서버에서 미리 렌더링(SSR/SSG)하기 때문에 localStorage에 바로 접근할 수 없음
  // 개발환경에서는 느린데 빌드 후에는 어떨지 모르겠음.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      // clientApi가 fetch wrapper라면 이렇게 사용!
      clientApi('/api/events?status=ongoing', { method: 'GET' }).then((data) => {
        setEvents(data);
      });
    }
  }, [hydrated]);
  if (!hydrated) return null;
  // TODO: Skelleton

  const handleFavToggle = (id: number) => {
    setFavorites((prev: number[]) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]));
  };
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
        {events.map((popup) => (
          <SwiperSlide key={popup.id} className="min-w-0">
            <CardComponent
              id={popup.id}
              title={popup.title}
              thumbnail={popup.thumbnail}
              eventStart={popup.eventStart}
              eventEnd={popup.eventEnd}
              isFavorite={favorites.includes(popup.id)}
              onToggleFav={handleFavToggle}
            />
            {/* </Link> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
