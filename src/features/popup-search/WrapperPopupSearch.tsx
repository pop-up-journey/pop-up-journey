'use client';

import EventsFilter from '@/features/popup-search/components/EventFilter';
import EventList from '@/features/popup-search/components/EventList';
import EventsMap from '@/features/popup-search/components/EventsMap';

import { PAGE_SIZE_EIGHT } from '@/configs/pageSize';
import { regionGroups } from '@/configs/regions';
import { usePagination } from '@/hooks/usePagination';
import { GetPopupsParams, getPopups } from '@/services/getPopups';
import { PopupWithTags } from '@/types/popup';
import { Divider } from '@heroui/react';
import { useEffect } from 'react';
import { useIntersectionObserver } from 'react-haiku';
import HeroSection from '../../components/common/hero-section';
interface Props {
  initialItems: PopupWithTags[];
  initialTotalCount: number;
  selectedZone: string | null;
  selectedTags: string[];
  fullEvents: PopupWithTags[];
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
    getPopups({ zone: selectedZone, tags: selectedTags, page, pageSize } as GetPopupsParams).then(
      ({ events, totalCount }) => ({
        items: events,
        totalCount,
      })
    );

  const { items, loading, isEnd, loadMore } = usePagination<PopupWithTags>(
    fetchFn,
    initialItems,
    initialTotalCount,
    PAGE_SIZE_EIGHT
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

  // id 기준으로 중복 제거
  const uniqueFiltered = filtered.filter((event, idx, arr) => arr.findIndex((e) => e.id === event.id) === idx);

  const mapEvents = selectedZone
    ? fullEvents.filter((e) => regionGroups[selectedZone].some((r) => e.address?.includes(r)))
    : fullEvents;

  const uniqueMapEvents = mapEvents.filter((event, idx, arr) => arr.findIndex((e) => e.id === event.id) === idx);

  return (
    <section className="mx-auto my-3 min-h-screen max-w-6xl overflow-hidden px-4">
      <HeroSection title="팝업의 여정 이벤트 탐색" description="지역과 관심 태그로 이벤트를 손쉽게 찾아보세요!" />
      <EventsMap events={uniqueMapEvents} />
      <EventsFilter selectedZone={selectedZone} selectedTags={selectedTags} />
      <Divider />
      <EventList events={uniqueFiltered} />
      <div ref={observeRef as React.RefObject<HTMLDivElement>} className="h-1" />
    </section>
  );
}
