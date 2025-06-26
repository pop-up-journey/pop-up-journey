import { regionGroups } from '@/configs/regions';
import EventsFilter from '@/features/events/components/EventFilter';
import EventList from '@/features/events/components/EventList';
import { clientApi } from '@/libs/api';

interface PageProps {
  searchParams: { zone?: string };
}

export default async function EventsPage({ searchParams }: PageProps) {
  const selectedZone = searchParams.zone ?? null;
  const events = await clientApi(`/api/events`, { method: 'GET' });

  type Event = { region: string; [key: string]: any };
  const filteredEvents = selectedZone
    ? (events as Event[]).filter((e: Event) => regionGroups[selectedZone].includes(e.region))
    : events;

  return (
    <section className="px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold">전체 이벤트 조회</h1>
      <EventsFilter selectedZone={selectedZone} />
      <EventList events={filteredEvents} />
    </section>
  );
}
