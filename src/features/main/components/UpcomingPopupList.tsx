'use client';

import { useState } from 'react';
import CardComponent from '../../../components/common/card';
import { upcomingPopupList } from '../../../mock/mockdata';

export default function UpcomingPopupList() {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, upcomingPopupList.length));
  };

  const isAllVisible = visibleCount >= upcomingPopupList.length;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-10">
      <h2 className="mb-8 text-2xl font-bold">오픈 예정 팝업</h2>

      <div className="-mx-4 grid grid-cols-1 gap-x-10 px-4 md:grid-cols-2">
        {upcomingPopupList.slice(0, visibleCount).map((popup) => (
          <CardComponent
            key={popup.id}
            title={popup.title}
            thumbnail={popup.thumbnail}
            tags={popup.tags}
            date={popup.date}
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
            더보기
          </button>
        </div>
      )}
    </section>
  );
}
