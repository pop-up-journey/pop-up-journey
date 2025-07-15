'use client';

import CardComponent from '@/components/common/card';
import { useSaveStore } from '@/store/useSaveStore';
import type { Popup } from '@/types/popup';
import { saveStoreDebounce } from '@/utils/saveStoreDebounce';

interface Props {
  events: Popup[];
  userId?: string;
}

export default function EventList({ events = [], userId }: Props) {
  const { savedStores, toggleSaveStore } = useSaveStore();

  if (events.length === 0) {
    return <p className="py-10 text-center text-gray-500">등록된 이벤트가 없습니다.</p>;
  }

  return (
    <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((evt) => {
        const isSaved = savedStores.includes(evt.id);

        const handleToggle = () => {
          toggleSaveStore(evt.id);
          saveStoreDebounce(evt.id, !isSaved, userId);
        };
        return (
          <li key={evt.id} className="transform transition-transform hover:scale-105">
            <CardComponent
              id={evt.id}
              title={evt.title}
              thumbnail={evt.thumbnail}
              // tags={evt.tags ?? []}
              eventStart={evt.eventStart}
              eventEnd={evt.eventEnd}
              savedCount={evt.saveCount ?? 0}
              isSaved={isSaved}
              onToggleSave={handleToggle}
            />
          </li>
        );
      })}
    </ul>
  );
}
