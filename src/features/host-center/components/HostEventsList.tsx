import EventStatusCard from '@/features/host-center/components/EventStatusCard';
import type { EventData } from '@/types/event';

interface Props {
  events: EventData[];
  getEventIcon: (status: string) => string;
  getStatusLabel: (status: string) => string;
}

export default function HostEventsList({ events, getEventIcon, getStatusLabel }: Props) {
  return (
    <section id="defaultSt" className="mx-auto mt-12 max-w-5xl">
      <ul className="space-y-6">
        {events.map((event) => (
          <li key={event.id}>
            <EventStatusCard
              icon={getEventIcon(event.eventStatus)}
              title={event.title}
              status={getStatusLabel(event.eventStatus)}
              views={123}
              likes={event.saveCount ?? 0}
              participants={456}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
