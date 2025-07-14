import PopupStatusCard from '@/features/host-center/components/PopupStatusCard';
import type { EventData } from '@/types/event';
import { ComponentType, useEffect, useState } from 'react';
import { useIntersectionObserver } from 'react-haiku';

interface HostPopupListProps {
  events: EventData[];
  getEventIcon: (status: string) => ComponentType<{ className?: string }>;
  getStatusLabel: (status: string) => string;
}

const PAGE_SIZE = 6;

export default function HostPopupList({ events, getEventIcon, getStatusLabel }: HostPopupListProps) {
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
            <PopupStatusCard
              icon={getEventIcon(event.eventStatus)}
              title={event.title}
              status={getStatusLabel(event.eventStatus)}
              views={123}
              likes={event.saveCount ?? 0}
              participants={456}
            />
            {idx === visibleCount - 1 && visibleCount < events.length && (
              <div ref={observeRef as React.RefObject<HTMLDivElement>} className="h-[30px]" />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
