import { PAGE_SIZE } from '@/features/popup-search/services/constants';
import WrapperPopupSearch from '@/features/popup-search/WrapperPopupSearch';
import { getEvents, GetEventsParams } from '@/services/getEvents';

interface PageProps {
  searchParams: Promise<{ zone?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { zone } = await searchParams;

  // 초기접속시 보여줄 이벤트 목록
  const { events, totalCount } = await getEvents({
    zone: zone ?? null,
    page: 1,
    pageSize: PAGE_SIZE,
  } as GetEventsParams);
  // 전체 이벤트(전체 조회, 맵에 표시하기 위함)
  const { events: fullEvents } = await getEvents({
    zone: zone ?? null,
    page: 1,
    pageSize: totalCount,
  } as GetEventsParams);
  console.log(
    events.map((e) => e.id),
    fullEvents.map((e) => e.id)
  );

  return (
    <WrapperPopupSearch
      selectedZone={zone ?? null}
      initialItems={events}
      initialTotalCount={totalCount}
      fullEvents={fullEvents}
    />
  );
}
