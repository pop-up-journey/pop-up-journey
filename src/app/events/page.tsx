import EventsPage from '@/_pages/EventsPage';
import { clientApi } from '@/libs/api';
import type { EventData } from '@/types/event';

interface PageProps {
  searchParams: Promise<{ zone?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { zone } = await searchParams;

  const params = new URLSearchParams({
    page: '1',
    pageSize: '6',
  });
  if (zone) params.set('zone', zone);

  const { events: initialItems, totalCount: initialTotalCount } = (await clientApi(`/api/events?${params.toString()}`, {
    method: 'GET',
  })) as {
    events: EventData[];
    totalCount: number;
  };
  return <EventsPage selectedZone={zone ?? null} initialItems={initialItems} initialTotalCount={initialTotalCount} />;
}
