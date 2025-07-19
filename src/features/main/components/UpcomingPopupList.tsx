'use client';

import Button from '@/components/common/button';
import { SectionLayout } from '@/features/main/components/SectionLayout';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { usePagination } from '@/hooks/usePagination';
import { getEvents } from '@/services/getEvents';
import type { Popup } from '@/types/popup';
import UpcomingPopupCard from './UpcomingPopupCard';

interface UpcomingPopupListProps {
  initialEvents: Popup[];
  sectionTitle: string;
  initialCount?: number;
}

export default function UpcomingPopupList({ sectionTitle, initialCount, initialEvents }: UpcomingPopupListProps) {
  const { userInfo } = useGetUserInfo();
  const userId = userInfo?.id;

  const pageSize = 4;

  const {
    items: events,
    loadMore,
    loading,
    isEnd,
  } = usePagination<Popup>(
    ({ page, pageSize }) =>
      getEvents({ status: 'upcoming', page, pageSize }).then(({ events, totalCount }) => ({
        items: events,
        totalCount: totalCount,
      })),
    initialEvents,
    initialCount ?? 0,
    pageSize
  );

  return (
    <SectionLayout title={sectionTitle} isEmpty={!events || events.length === 0}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-x-15 lg:gap-y-12">
        {events.map((popup) => (
          <UpcomingPopupCard key={popup.id} popup={popup} userId={userId} />
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
