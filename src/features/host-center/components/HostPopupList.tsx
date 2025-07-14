import PopupStatusCard from '@/features/host-center/components/PopupStatusCard';
import type { Popup } from '@/types/popup';
import { ComponentType, useEffect, useState } from 'react';
import { useIntersectionObserver } from 'react-haiku';

interface HostPopupListProps {
  popups: Popup[];
  getEventIcon: (status: string) => ComponentType<{ className?: string }>;
  getStatusLabel: (status: string) => string;
}

const PAGE_SIZE = 6;

export default function HostPopupList({ popups, getEventIcon, getStatusLabel }: HostPopupListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { observeRef, isVisible } = useIntersectionObserver({
    options: { threshold: 0.2 },
  });

  useEffect(() => {
    if (isVisible && visibleCount < popups.length) {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, popups.length));
    }
  }, [isVisible, visibleCount, popups.length]);

  return (
    <section id="defaultSt" className="mx-auto mt-12 max-w-5xl">
      <ul className="space-y-6">
        {popups.slice(0, visibleCount).map((popup, idx) => (
          <li key={popup.id}>
            <PopupStatusCard
              icon={getEventIcon(popup.eventStatus)}
              title={popup.title}
              status={getStatusLabel(popup.eventStatus)}
              views={123}
              likes={popup.saveCount ?? 0}
              participants={456}
            />
            {idx === visibleCount - 1 && visibleCount < popups.length && (
              <div ref={observeRef as React.RefObject<HTMLDivElement>} className="h-[30px]" />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
