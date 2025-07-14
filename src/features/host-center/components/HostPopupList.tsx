'use client';

import CardComponent from '@/components/common/card';
import { POPUP_STATUS, type Popup, type PopupStatusType } from '@/types/popup';
import { ComponentType, useEffect, useState } from 'react';
import { useIntersectionObserver } from 'react-haiku';

interface HostPopupListProps {
  popups: Popup[];
  selectedStatus: PopupStatusType;
  getEventIcon: (status: string) => ComponentType<{ className?: string }>;
  getStatusLabel: (status: string) => string;
}

const PAGE_SIZE = 6;

const POPUP_STATUS_MSG = {
  [POPUP_STATUS.Ongoing]: '주최된 팝업이 없습니다.',
  [POPUP_STATUS.Ended]: '종료된 팝업이 없습니다.',
  [POPUP_STATUS.Upcoming]: '예정된 팝업이 없습니다.',
} as const;

export default function HostPopupList({ popups, selectedStatus, getEventIcon, getStatusLabel }: HostPopupListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  console.log(popups);

  const { observeRef, isVisible } = useIntersectionObserver({
    options: { threshold: 0.2 },
  });

  useEffect(() => {
    if (isVisible && visibleCount < popups.length) {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, popups.length));
    }
  }, [isVisible, visibleCount, popups.length]);

  return (
    <section id="defaultSt" className="mx-auto mt-12 flex max-w-5xl items-center justify-center">
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {popups.length === 0 && <div className="text-white">{POPUP_STATUS_MSG[selectedStatus]}</div>}
        {popups.slice(0, visibleCount).map((popup, idx) => (
          <li key={popup.id}>
            {/* <PopupStatusCard
              icon={getEventIcon(popup.eventStatus)}
              title={popup.title}
              status={getStatusLabel(popup.eventStatus)}
              views={123}
              likes={popup.saveCount ?? 0}
              participants={456}
            /> */}
            <CardComponent
              location={popup?.address?.split(',').map((s: any) => s.trim())[2] || ''}
              savedCount={popup.saveCount}
              {...popup}
              variant="compact"
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
