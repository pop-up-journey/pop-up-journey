import { regionGroups } from '@/configs/regions';
import EventsFilter from '@/features/events/components/EventFilter';
import EventList from '@/features/events/components/EventList';
import EventsMap from '@/features/events/components/EventsMap';

import { clientApi } from '@/libs/api';
import { Divider } from '@heroui/react';

interface PageProps {
  searchParams: { zone?: string };
}

export default async function EventPage({ searchParams }: PageProps) {
  const selectedZone = searchParams.zone ?? null;
  const events = (await clientApi('/api/events', { method: 'GET' })) as any[];

  const filteredEvents = selectedZone
    ? events.filter((e) => regionGroups[selectedZone].some((region) => e.address.includes(region)))
    : events;
  // TODO: 전국 팝업 지도도 같이 띄워 주면 좋을 것 같음.
  // TODO: 데이터 여러개인 경우에 무한 스크롤
  // console.log(e);
  console.log(filteredEvents);
  return (
    <section className="mx-auto my-3 min-h-screen max-w-6xl overflow-hidden px-4">
      <EventsFilter selectedZone={selectedZone} />
      <Divider />
      <EventsMap events={filteredEvents} />
      <EventList events={filteredEvents} />
    </section>
  );
}
