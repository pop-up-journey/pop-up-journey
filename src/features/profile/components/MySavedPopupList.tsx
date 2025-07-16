'use client';

import { clientApi } from '@/libs/api';
import { getSavedPopupIds } from '@/services/getSavedPopupIds';
import { useSaveStore } from '@/store/save/useSaveStore';
import type { Popup } from '@/types/popup';
import { useEffect, useState } from 'react';

import Button from '@/components/common/button';
import SavedPopupCard from './SavePopupCard';

export default function MySavedPopupList({ userId }: { userId: string }) {
  const [popups, setPopups] = useState<Popup[]>([]);
  const { savedStores, setSavedStores, toggleAndSyncSave } = useSaveStore();

  // 서버에서 저장된 ID 목록 초기화
  useEffect(() => {
    getSavedPopupIds(userId).then((ids) => {
      if (Array.isArray(ids)) setSavedStores(ids);
    });
  }, [userId, setSavedStores]);

  // ID 목록이 바뀔 때마다 상세 데이터 로드
  useEffect(() => {
    if (savedStores.length === 0) {
      setPopups([]);
      return;
    }
    (async () => {
      const loaded = await Promise.all(
        savedStores.map(async (id) => {
          try {
            return await clientApi<Popup>(`/api/events/${id}`, { method: 'GET' });
          } catch {
            return null;
          }
        })
      );
      setPopups(loaded.filter((x): x is Popup => !!x));
    })();
  }, [savedStores]);

  // 개별 삭제 핸들러
  const removeFavorite = (id: string) => {
    toggleAndSyncSave(id, userId);
  };

  // 전체 삭제 핸들러
  const clearAll = () => {
    if (!confirm('관심 팝업을 전부 삭제하시겠습니까?')) return;
    savedStores.forEach((id) => toggleAndSyncSave(id, userId));
  };

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-bold">나의 관심 팝업</h2>

      {popups.length > 0 && (
        <div className="mb-4 text-right">
          <Button size="sm" onPress={clearAll}>
            전체 삭제
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {popups.map((popup) => (
          <SavedPopupCard
            key={popup.id}
            popup={popup}
            userId={userId}
            removeFavorite={() => removeFavorite(popup.id)}
          />
        ))}
      </div>

      {popups.length === 0 && <p className="text-center text-gray-500">아직 관심 팝업이 없습니다.</p>}
    </section>
  );
}
