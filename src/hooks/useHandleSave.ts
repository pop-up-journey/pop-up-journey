'use client';

import { useSaveStore } from '@/store/useSaveStore';
import { saveStoreDebounce } from '@/utils/saveStoreDebounce';

export default function useHandleSave(eventId: string, userId?: string) {
  // Zustand에서 가져오기
  const savedStores = useSaveStore((s) => s.savedStores);
  const toggleSaveStore = useSaveStore((s) => s.toggleSaveStore);

  // 현재 저장 여부
  const isSaved = savedStores.includes(eventId);

  // 토글 핸들러
  const toggle = () => {
    toggleSaveStore(eventId);
    saveStoreDebounce(eventId, !isSaved, userId);
  };

  return { isSaved, toggle };
}
