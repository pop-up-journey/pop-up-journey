'use client';

import { getSavedStoreIds } from '@/hooks/getSavedStoreIds';
import { useSaveStore } from '@/store/save/useSaveStore';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import EventCard from './EventCard';
import type { Popup } from '@/types/popup';

interface Props {
  events: Popup[];
  userId?: string;
}

export default function EventList({ events = [], userId }: Props) {
  const { data: session } = useSession();
  userId = userId || session?.user?.id;
  const setSavedStores = useSaveStore((s) => s.setSavedStores);

  useEffect(() => {
    let mounted = true;
    if (userId) {
      (async () => {
        const ids = await getSavedStoreIds(userId);
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
    <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

      {* // TODO: tags는 추가 해야하고 savedCount도 따로 route 수정해야함 *}
      {events.map((evt) => (
        <EventCard key={evt.id} event={evt} userId={userId} />
      ))}

    </ul>
  );
}
