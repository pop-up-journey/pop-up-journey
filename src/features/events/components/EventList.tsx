'use client';

import CardComponent from '@/components/common/card';
import Link from 'next/link';

interface Event {
  id: number;
  title: string;
  region: string;
  date: string;
  thumbnail: string;
  tags?: string[];
}

interface Props {
  events: Event[];
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
            <CardComponent title={evt.title} thumbnail={evt.thumbnail} tags={evt.tags ?? []} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
