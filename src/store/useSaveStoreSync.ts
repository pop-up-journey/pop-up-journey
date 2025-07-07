import { useSaveStore } from '@/store/useSaveStore';
import { useEffect } from 'react';

// 좋아요 초기화 (SSR → zustand로 한 번만 복사)
// zustand setter를 무조건 실행 X, 값이 다를때만 실행
export function useSaveStoreSync(likeEventIds: number[]) {
  useEffect(() => {
    const current = useSaveStore.getState().savedStores;
    if (likeEventIds.length !== current.length || !likeEventIds.every((id, idx) => current[idx] === id)) {
      useSaveStore.getState().setSavedStores(likeEventIds ?? []);
    }
  }, [likeEventIds]);
}
