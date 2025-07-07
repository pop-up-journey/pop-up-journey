'use client';
import CardComponent from '@/components/common/card';
import { useState } from 'react';

interface UpcomingPopupListProps {
  events: any[]; // 타입 필요시 정확하게!
}

export default function UpcomingPopupList({ events }: UpcomingPopupListProps) {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, events.length));
  };

  const isAllVisible = visibleCount >= events.length;

  return (
    <section className="mx-auto mb-10 max-w-6xl px-4 pb-10">
      <h2 className="mb-4 text-2xl font-bold">오픈 예정 팝업</h2>
      <div className="-mx-4 grid grid-cols-1 gap-10 px-4 md:grid-cols-2">
        {events.slice(0, visibleCount).map((popup) => (
          <CardComponent
            key={popup.id}
            id={popup.id}
            title={popup.title}
            location={popup.address.split(',').map((s: any) => s.trim())[2] || ''}
            thumbnail={popup.thumbnail}
            eventStart={popup.eventStart}
            eventEnd={popup.eventEnd}
            savedCount={popup.saveCount}
            variant="compact"
          />
        ))}
      </div>

      {!isAllVisible && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleShowMore}
            className="border-default-200 hover:bg-default-100 w-full cursor-pointer rounded-md border px-6 py-2 text-sm"
          >
            {/* TODO: 더보기 Button -> 공통 UI로 디자인 변경 예정 */}
            더보기
          </button>
        </div>
      )}
    </section>
  );
}
