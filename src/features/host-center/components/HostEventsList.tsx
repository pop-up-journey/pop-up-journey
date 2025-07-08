import EventStatusCard from '@/features/host-center/components/EventStatusCard';
import type { EventData } from '@/types/event';
import { useEffect, useState } from 'react';
import { useIntersectionObserver } from 'react-haiku';

interface Props {
  events: EventData[];
  getEventIcon: (status: string) => string;
  getStatusLabel: (status: string) => string;
}

const PAGE_SIZE = 6;

export default function HostEventsList({ events, getEventIcon, getStatusLabel }: Props) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { observeRef, isVisible } = useIntersectionObserver({
    options: { threshold: 0.2 },
  });

  useEffect(() => {
    if (isVisible && visibleCount < events.length) {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, events.length));
    }
  }, [isVisible, visibleCount, events.length]);

  return (
    <section id="defaultSt" className="mx-auto mt-12 max-w-5xl">
      <ul className="space-y-6">
        {events.slice(0, visibleCount).map((event, idx) => (
          <li key={event.id}>
            <EventStatusCard
              icon={getEventIcon(event.eventStatus)}
              title={event.title}
              status={getStatusLabel(event.eventStatus)}
              views={123}
              likes={event.saveCount ?? 0}
              participants={456}
            />
            {/* 마지막 아이템에 ref 부착 */}
            {idx === visibleCount - 1 && visibleCount < events.length && (
              <div ref={observeRef as React.RefObject<HTMLDivElement>} style={{ height: 30 }} />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
