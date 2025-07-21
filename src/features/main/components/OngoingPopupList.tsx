'use client';

import { PopupSwiper } from '@/features/main/components/PopupSwiper';
import { SectionLayout } from '@/features/main/components/SectionLayout';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { useSaveStore } from '@/store/save/useSaveStore';
import type { Popup } from '@/types/popup';
import { useEffect } from 'react';

interface OngoingPopupListProps {
  events: Popup[];
  likeEventIds: string[];
  sectionTitle: string;
}

export default function OngoingPopupList({ events, likeEventIds, sectionTitle }: OngoingPopupListProps) {
  const { userInfo } = useGetUserInfo();
  const userId = userInfo?.id;
  const savedStores = useSaveStore((s) => s.savedStores);
  const setSavedStores = useSaveStore((s) => s.setSavedStores);

  useEffect(() => {
    if (savedStores.length === 0 && likeEventIds.length > 0) {
      setSavedStores(likeEventIds);
    }
  }, [savedStores.length, likeEventIds, setSavedStores]);

  return (
    <SectionLayout title={sectionTitle} isEmpty={events.length === 0} rightSlot="더 많은 이벤트 보기">
      <PopupSwiper events={events} userId={userId} />
    </SectionLayout>
  );
}
