'use client';
import Button from '@/components/common/button';
import CardComponent from '@/components/common/card';
import { SectionLayout } from '@/features/main/components/SectionLayout';
import type { EventData } from '@/types/event';
import { useState } from 'react';

interface UpcomingPopupListProps {
  events: EventData[];
  sectionTitle: string;
  initialCount?: number;
  moreCount?: number;
}

export default function UpcomingPopupList({
  events,
  sectionTitle,
  initialCount = 4,
  moreCount = 4,
}: UpcomingPopupListProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const isAllVisible = visibleCount >= events.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + moreCount, events.length));
  };

  return (
    <SectionLayout title={sectionTitle} isEmpty={!events || events.length === 0}>
      <div className="-mx-4 grid grid-cols-1 gap-10 px-4 md:grid-cols-2">
        {events.slice(0, visibleCount).map((popup) => (
          <CardComponent
            key={popup.id}
            location={popup.address.split(',').map((s: any) => s.trim())[2] || ''}
            savedCount={popup.saveCount}
            {...popup}
            variant="compact"
          />
        ))}
      </div>

      {!isAllVisible && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleShowMore}
            className="border-default-200 hover:bg-default-100 w-full cursor-pointer rounded-md border px-6 py-2 text-sm"
          >
            더보기
          </Button>
        </div>
      )}
    </SectionLayout>
  );
}
