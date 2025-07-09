'use client';
import Button from '@/components/common/button';
import CardComponent from '@/components/common/card';
import { SectionLayout } from '@/features/main/components/SectionLayout';
import { getEvents } from '@/features/main/services/getEvents';
import { usePagination } from '@/hooks/usePagination';
import type { EventData } from '@/types/event';

interface UpcomingPopupListProps {
  initialEvents: EventData[];
  sectionTitle: string;
  initialCount?: number;
}

export default function UpcomingPopupList({ sectionTitle, initialCount, initialEvents }: UpcomingPopupListProps) {
  const pageSize = 4;
  const {
    items: events,
    loadMore,
    loading,
    isEnd,
  } = usePagination<EventData>(
    ({ page, pageSize }) =>
      getEvents({ status: 'upcoming', page, pageSize }).then((res) => ({
        items: res?.events ?? [],
        totalCount: res?.totalCount ?? 0,
      })),
    initialEvents,
    initialCount ?? 0,
    pageSize
  );

  return (
    <SectionLayout title={sectionTitle} isEmpty={!events || events.length === 0}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-x-15 lg:gap-y-12">
        {events.map((popup) => (
          <CardComponent
            key={popup.id}
            location={popup?.address?.split(',').map((s: any) => s.trim())[2] || ''}
            savedCount={popup.saveCount}
            {...popup}
            variant="compact"
          />
        ))}
      </div>
      {!isEnd && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={loadMore}
            disabled={loading}
            className="border-default-200 hover:bg-default-100 w-full cursor-pointer rounded-md border px-6 py-2 text-sm"
          >
            더보기
          </Button>
        </div>
      )}
    </SectionLayout>
  );
}
