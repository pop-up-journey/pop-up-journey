import { PAGE_SIZE } from '@/features/popup-search/services/constants';
import { fetchEvents } from '@/features/popup-search/services/fetchEvents';
import WrapperPopupSearch from '@/features/popup-search/WrapperPopupSearch';

interface PageProps {
  searchParams: Promise<{ zone?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { zone } = await searchParams;
  const { events, totalCount } = await fetchEvents({
    zone,
    page: 1,
    pageSize: PAGE_SIZE,
  });

  const { events: fullEvents } = await fetchEvents({
    zone,
    page: 1,
    pageSize: totalCount, // totalCount만큼 다 가져옴
  });

  return (
    <WrapperPopupSearch
      selectedZone={zone ?? null}
      initialItems={events}
      initialTotalCount={totalCount}
      fullEvents={fullEvents}
    />
  );
}
