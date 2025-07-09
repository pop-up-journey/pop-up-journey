'use client';

import { SectionLayout } from '@/features/main/components/SectionLayout';
import { SwiperPopupList } from '@/features/main/components/SwiperPopupList';
import { useSaveStore } from '@/store/useSaveStore';
import type { EventData } from '@/types/event';
import { saveStoreDebounce } from '@/utils/saveStoreDebounce';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface OngoingPopupListProps {
  events: EventData[];
  likeEventIds: string[];
  sectionTitle: string;
}

export default function OngoingPopupList({ events, likeEventIds, sectionTitle }: OngoingPopupListProps) {
  const { data: session } = useSession();
  //SSR zustand 동기화
  useEffect(() => {
    const current = useSaveStore.getState().savedStores;
    // zustand에 이미 값이 있으면 서버값으로 덮지 않음 (초기 진입시에만 동작)
    if (current.length === 0 && likeEventIds.length > 0) {
      useSaveStore.getState().setSavedStores(likeEventIds);
    }
  }, []);

  // 관심이벤트 zustand 관리
  const saveStores = useSaveStore((s) => s.savedStores);
  const toggleSaveStore = useSaveStore((s) => s.toggleSaveStore);
  // NOTE: Swiper 내부에서 re-render가 많다면 useCallback으로 래핑 가능
  const handleSaves = async (eventId: string) => {
    // zustand 반영 : 실시간 토글 UI
    toggleSaveStore(eventId);
    const isNowSaved = !saveStores.includes(eventId);
    // 서버에 반영 : debounce적용->마지막 action 0.4초후 API호출
    saveStoreDebounce(eventId, isNowSaved, session?.user?.id);
  };

  return (
    <SectionLayout title={sectionTitle} isEmpty={!events || events.length === 0} rightSlot="더 많은 이벤트 보기">
      {/* HACK : 애니메이션 변경 예정*/}
      <SwiperPopupList events={events} isSaved={(id) => saveStores.includes(id)} onToggleSave={handleSaves} />
    </SectionLayout>
  );
}
