import EventsPage from '@/_pages/EventsPage';
import { PAGE_SIZE } from '@/features/events/services/constants';
import { fetchEvents } from '@/features/events/services/fetchEvents';

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
    <EventsPage
      selectedZone={zone ?? null}
      initialItems={events}
      initialTotalCount={totalCount}
      fullEvents={fullEvents}
    />
  );
}
