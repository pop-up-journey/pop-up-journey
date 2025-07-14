'use client';

import { SectionLayout } from '@/features/main/components/SectionLayout';
import { SwiperPopupList } from '@/features/main/components/SwiperPopupList';
import { useSaveStore } from '@/store/useSaveStore';
import type { EventData } from '@/types/event';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';

interface OngoingPopupListProps {
  events: EventData[];
  likeEventIds: string[];
  sectionTitle: string;
}

export default function OngoingPopupList({ events, likeEventIds, sectionTitle }: OngoingPopupListProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const savedStores = useSaveStore((s) => s.savedStores);
  const toggleSave = useSaveStore((s) => s.toggleAndSyncSave);
  const setSavedStores = useSaveStore((s) => s.setSavedStores);

  // 최초 한 번만 서버값으로 초기화 (guard 추가)
  useEffect(() => {
    if (savedStores.length === 0 && likeEventIds.length > 0) {
      setSavedStores(likeEventIds);
    }
  }, [savedStores.length, likeEventIds, setSavedStores]);

  // 토글 핸들러
  const handleToggle = useCallback(
    (id: string) => {
      toggleSave(id, userId);
    },
    [toggleSave, userId]
  );

  // isSaved -> useCallback (최적화)
  const isSaved = useCallback((id: string) => savedStores.includes(id), [savedStores]);

  return (
    <SectionLayout title={sectionTitle} isEmpty={events.length === 0} rightSlot="더 많은 이벤트 보기">
      <SwiperPopupList events={events} isSaved={isSaved} onToggleSave={handleToggle} />
    </SectionLayout>
  );
}
