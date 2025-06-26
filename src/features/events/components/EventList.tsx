'use client';

import CardComponent from '@/components/common/card';
import type { EventData } from '@/types/event';
import Link from 'next/link';

interface Props {
  events: EventData[];
}

export default function EventList({ events }: Props) {
  if (!events || events.length === 0) {
    return <p className="py-10 text-center text-gray-500">등록된 이벤트가 없습니다.</p>;
  }

  return (
    <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((evt) => (
        <li key={evt.id} className="transform transition-transform hover:scale-105">
          <Link href={`/event/${evt.id}`} className="block">
            <CardComponent
              title={evt.title}
              thumbnail={evt.thumbnail}
              tags={evt.tags ?? []}
              eventStart={evt.eventStart}
              eventEnd={evt.eventEnd}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
