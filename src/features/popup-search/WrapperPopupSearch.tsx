'use client';

import EventsFilter from '@/features/popup-search/components/EventFilter';
import EventList from '@/features/popup-search/components/EventList';
import EventsMap from '@/features/popup-search/components/EventsMap';

import { PAGE_SIZE } from '@/configs/constants';
import { regionGroups } from '@/configs/regions';
import { usePagination } from '@/hooks/usePagination';
import { getEvents, GetEventsParams } from '@/services/getEvents';
import { Popup } from '@/types/popup';
import { Divider } from '@heroui/react';
import { useEffect } from 'react';
import { useIntersectionObserver } from 'react-haiku';
import HeroSection from '../../components/common/hero-section';
interface Props {
  initialItems: Popup[];
  initialTotalCount: number;
  selectedZone: string | null;
  selectedTags: string[];

  fullEvents: Popup[];
}

export default function WrapperPopupSearch({
  initialItems,
  initialTotalCount,
  selectedZone,
  selectedTags,
  fullEvents,
}: Props) {
  //NOTE: UseCallback, 페이지네이션: 6개씩 추가 렌더링
  const fetchFn = ({ page, pageSize }: { page: number; pageSize: number }) =>
    getEvents({ zone: selectedZone, tags: selectedTags, page, pageSize } as GetEventsParams).then(
      ({ events, totalCount }) => ({
        items: events,
        totalCount,
      })
    );

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
      <HeroSection title="팝업의 여정 이벤트 탐색" description="지역과 관심 태그로 이벤트를 손쉽게 찾아보세요!" />
      <EventsMap events={mapEvents} />
      <EventsFilter selectedZone={selectedZone} selectedTags={selectedTags} />
      <Divider />
      <EventList events={filtered} />
      <div ref={observeRef as React.RefObject<HTMLDivElement>} className="h-1" />
    </section>
  );
}
