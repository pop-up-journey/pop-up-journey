'use client';

import { SectionLayout } from '@/features/main/components/SectionLayout';
import { SwiperPopupList } from '@/features/main/components/SwiperPopupList';
import { useSaveStore } from '@/store/save/useSaveStore';
import type { Popup } from '@/types/popup';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface OngoingPopupListProps {
  events: Popup[];
  likeEventIds: string[];
  sectionTitle: string;
}

export default function OngoingPopupList({ events, likeEventIds, sectionTitle }: OngoingPopupListProps) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const savedStores = useSaveStore((s) => s.savedStores);
  const setSavedStores = useSaveStore((s) => s.setSavedStores);

  useEffect(() => {
    if (savedStores.length === 0 && likeEventIds.length > 0) {
      setSavedStores(likeEventIds);
    }
  }, [savedStores.length, likeEventIds, setSavedStores]);

  return (
    <SectionLayout title={sectionTitle} isEmpty={events.length === 0} rightSlot="더 많은 이벤트 보기">
      <SwiperPopupList events={events} userId={userId} />
    </SectionLayout>
  );
}
