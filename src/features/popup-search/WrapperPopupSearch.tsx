'use client';

import EventsFilter from '@/features/popup-search/components/EventFilter';
import EventList from '@/features/popup-search/components/EventList';
import EventsMap from '@/features/popup-search/components/EventsMap';

import { regionGroups } from '@/configs/regions';
import { PAGE_SIZE } from '@/features/popup-search/services/constants';
import { fetchEvents } from '@/features/popup-search/services/fetchEvents';
import { usePagination } from '@/hooks/usePagination';
import { Popup } from '@/types/popup';
import { Divider } from '@heroui/react';
import { useEffect } from 'react';
import { useIntersectionObserver } from 'react-haiku';
interface Props {
  initialItems: Popup[];
  initialTotalCount: number;
  selectedZone: string | null;
  fullEvents: Popup[];
}

export default function WrapperPopupSearch({ initialItems, initialTotalCount, selectedZone, fullEvents }: Props) {
  //NOTE: UseCallback
  const fetchFn = ({ page, pageSize }: { page: number; pageSize: number }) =>
    fetchEvents({ zone: selectedZone, page, pageSize }).then(({ events, totalCount }) => ({
      items: events,
      totalCount,
    }));

  const { items, loading, isEnd, loadMore } = usePagination<Popup>(fetchFn, initialItems, initialTotalCount, PAGE_SIZE);

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

  const mapEvents = selectedZone
    ? fullEvents.filter((e) => regionGroups[selectedZone].some((r) => e.address?.includes(r)))
    : fullEvents;

  return (
    <section className="mx-auto my-3 min-h-screen max-w-6xl overflow-hidden px-4">
      <EventsFilter selectedZone={selectedZone} />
      <Divider />
      <EventsMap events={mapEvents} />
      <EventList events={filtered} />
      <div ref={observeRef as React.RefObject<HTMLDivElement>} className="h-1" />
    </section>
  );
}
