import { useSaveStore } from '@/store/useSaveStore';
import { useEffect } from 'react';

export function useSaveStoreSync(likeEventIds: number[]) {
  useEffect(() => {
    const current = useSaveStore.getState().savedStores;
    // zustand에 이미 값이 있으면 서버값으로 덮지 않음 (초기 진입시에만 동작)
    if (current.length === 0 && likeEventIds.length > 0) {
      useSaveStore.getState().setSavedStores(likeEventIds);
    }
  }, []);
}
