'use client';

import { SectionLayout } from '@/features/main/components/SectionLayout';
import { SwiperPopupList } from '@/features/main/components/SwiperPopupList';
import { useSaveStore } from '@/store/useSaveStore';
import { useSaveStoreSync } from '@/store/useSaveStoreSync';
import type { EventData } from '@/types/event';
import { saveStoreDebounce } from '@/utils/saveStoreDebounce';
import { useSession } from 'next-auth/react';

interface CurrentPopupListProps {
  events: EventData[];
  likeEventIds: number[];
  sectionTitle: string;
}

export default function CurrentPopupList({ events, likeEventIds, sectionTitle }: CurrentPopupListProps) {
  const { data: session } = useSession();
  //SSR zustand 동기화 커스텀훅
  useSaveStoreSync(likeEventIds);

  // 관심이벤트 zustand 관리
  const saveStores = useSaveStore((s) => s.savedStores);
  const toggleSaveStore = useSaveStore((s) => s.toggleSaveStore);
  // NOTE: Swiper 내부에서 re-render가 많다면 useCallback으로 래핑 가능
  const handleSaves = async (eventId: number) => {
    // zustand 반영 : 실시간 토글 UI
    toggleSaveStore(eventId);
    const isNowSaved = !saveStores.includes(eventId);
    // 서버에 반영 : debounce적용->마지막 action 0.4초후 API호출
    saveStoreDebounce(eventId, isNowSaved, session?.user?.id);
  };

  return (
    <SectionLayout title={sectionTitle} isEmpty={!events || events.length === 0}>
      {/* HACK : 애니메이션 변경 예정*/}
      <SwiperPopupList events={events} isSaved={(id) => saveStores.includes(id)} onToggleSave={handleSaves} />
    </SectionLayout>
  );
}
