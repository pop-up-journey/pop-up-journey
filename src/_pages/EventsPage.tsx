'use client';

import EventsFilter from '@/features/events/components/EventFilter';
import EventList from '@/features/events/components/EventList';
import EventsMap from '@/features/events/components/EventsMap';

import { regionGroups } from '@/configs/regions';
import { usePagination } from '@/hooks/usePagination';
import { clientApi } from '@/libs/api';
import { EventData } from '@/types/event';
import { Divider } from '@heroui/react';
import { useEffect } from 'react';
import { useIntersectionObserver } from 'react-haiku';
interface Props {
  initialItems: EventData[];
  initialTotalCount: number;
  selectedZone: string | null;
}

const PAGE_SIZE = 6;

export default function EventPage({ initialItems, initialTotalCount, selectedZone }: Props) {
  //NOTE: UseCallback
  const fetchFn = async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      ...(selectedZone ? { zone: selectedZone } : {}),
    });

    const { events, totalCount } = (await clientApi(`/api/events?${params.toString()}`, { method: 'GET' })) as {
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
    PAGE_SIZE
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

  // NOTE: useMemo로 items가 바뀔때만 필터가 재계산 되도록 최적화 가능
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
