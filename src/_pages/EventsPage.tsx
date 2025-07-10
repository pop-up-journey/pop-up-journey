'use client';

import EventsFilter from '@/features/events/components/EventFilter';
import EventList from '@/features/events/components/EventList';
import EventsMap from '@/features/events/components/EventsMap';

import { regionGroups } from '@/configs/regions';
import { usePagination } from '@/hooks/usePagination';
import { EventData } from '@/types/event';
import { Divider } from '@heroui/react';
import { useEffect } from 'react';
import { useIntersectionObserver } from 'react-haiku';
interface Props {
  initialItems: EventData[];
  initialTotalCount: number;
  selectedZone: string | null;
}

export default function EventPage({ initialItems, initialTotalCount, selectedZone }: Props) {
  const fetchFn = async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const url = new URL('/api/events', window.location.origin);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('pageSize', pageSize.toString());
    if (selectedZone) url.searchParams.set('zone', selectedZone);

    const res = await fetch(url.toString());
    const { events, totalCount } = (await res.json()) as {
      events: EventData[];
      totalCount: number;
    };

    return {
      items: events,
      totalCount,
    };
  };

  // usePagination 훅
  const { items, loading, isEnd, loadMore } = usePagination<EventData>(
    fetchFn,
    initialItems,
    initialTotalCount,
    /* pageSize */ 6
  );

  const { observeRef, isVisible } = useIntersectionObserver({
    options: {
      threshold: 0,
      rootMargin: '200px',
    },
  });

  useEffect(() => {
    if (isVisible && !loading && !isEnd) {
      loadMore();
    }
  }, [isVisible, loading, isEnd, loadMore]);

  //
  const filtered = selectedZone
    ? items.filter((e) => regionGroups[selectedZone].some((region) => e?.address?.includes(region)))
    : items;

  return (
    <section className="mx-auto my-3 min-h-screen max-w-6xl overflow-hidden px-4">
      <EventsFilter selectedZone={selectedZone} />
      <Divider />
      <EventsMap events={filtered} />
      <EventList events={filtered} />
      <div ref={observeRef as React.RefObject<HTMLDivElement>} className="h-1" />
    </section>
  );
}
