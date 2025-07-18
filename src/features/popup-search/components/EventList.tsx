'use client';

import useGetUserInfo from '@/hooks/useGetUserInfo';
import { getSavedPopupIds } from '@/services/getSavedPopupIds';
import { useSaveStore } from '@/store/save/useSaveStore';
import type { Popup } from '@/types/popup';
import { useEffect } from 'react';
import EventCard from './EventCard';

interface Props {
  events: Popup[];
  userId?: string;
}

export default function EventList({ events = [], userId }: Props) {
  const { userInfo } = useGetUserInfo();
  userId = userId || userInfo?.id;
  const setSavedStores = useSaveStore((s) => s.setSavedStores);

  useEffect(() => {
    let mounted = true;
    if (userId) {
      (async () => {
        const ids = await getSavedPopupIds(userId);
        if (mounted && Array.isArray(ids) && ids.length > 0) {
          setSavedStores(ids);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [userId, setSavedStores]);

  if (events.length === 0) {
    return <p className="py-10 text-center text-gray-500">등록된 이벤트가 없습니다.</p>;
  }

  return (
    <ul className="mt-10 flex flex-wrap justify-between space-y-10">
      {/* // TODO: tags는 추가 해야하고 savedCount도 따로 route 수정해야함 */}
      {events.map((evt) => (
        <li key={evt.id} className="transform overflow-hidden transition-transform hover:scale-105">
          <EventCard key={evt.id} event={evt} userId={userId} />
        </li>
      ))}
    </ul>
  );
}
