'use client';

import CardComponent from '@/components/common/card';
import { useSaveStore } from '@/store/useSaveStore';
import { saveStoreDebounce } from '@/utils/saveStoreDebounce';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CurrentPopupListProps {
  events: any[];
  likeEventIds: number[];
}

export default function CurrentPopupList({ events, likeEventIds }: CurrentPopupListProps) {
  // HACK: 이벤트를 꼭 상태에 넣어주어야 할까. 정적으로 미리 받아와서 뿌려주는 걸로 변경해보자.
  // const [events, setEvents] = useState<any[]>([]);
  const { data: session } = useSession();
  // const [hydrated, setHydrated] = useState(false);

  // 좋아요 초기화 (SSR → zustand로 한 번만 복사)
  useEffect(() => {
    useSaveStore.getState().setSavedStores(likeEventIds ?? []);
  }, [likeEventIds]);

  //좋아요 zustand로 관리
  const saveStores = useSaveStore((s) => s.savedStores);
  const toggleSaveStore = useSaveStore((s) => s.toggleSaveStore);

  // NOTE: next.js가 기본적으로 컴포넌트를 서버에서 미리 렌더링(SSR/SSG)하기 때문에 localStorage에 바로 접근할 수 없음
  // useEffect(() => {
  //   setHydrated(true);
  // }, []);

  // useEffect(() => {
  //   if (hydrated) {
  //     clientApi('/api/events?status=ongoing', { method: 'GET' }).then((data) => {
  //       setEvents(data);
  //     });
  //   }
  // }, [hydrated]);

  const handleSaves = async (eventId: number) => {
    // zustand에 토글 실시간 반영
    toggleSaveStore(eventId);
    const isNowSaved = !saveStores.includes(eventId);
    // 서버에 반영 (debounce적용->마지막 action 0.4초후 API호출)
    saveStoreDebounce(eventId, isNowSaved, session?.user?.id);
  };

  // if (!hydrated) return null;

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
              isSaved={saveStores.includes(popup.id)}
              onToggleSave={handleSaves}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
