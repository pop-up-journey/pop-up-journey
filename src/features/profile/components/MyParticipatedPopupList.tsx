'use client';

import CardComponent from '@/components/common/card';
import { useEffect, useState } from 'react';
import { ParticipatedPopup, getParticipatedPopups } from '../api/getParticipatedPopups';

export default function MyParticipatedPopupList({ userId }: { userId: string }) {
  const [popups, setPopups] = useState<ParticipatedPopup[]>([]);

  useEffect(() => {
    if (!userId) return;
    getParticipatedPopups(userId).then((res) => setPopups(res));
  }, [userId]);

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-bold">신청한 팝업</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {popups.map((popup) => (
          <div key={popup.id} className="relative">
            <CardComponent
              id={popup.id}
              title={popup.title}
              thumbnail={popup.thumbnail}
              location={popup.address?.split(',').map((s) => s.trim())[2] ?? ''}
              eventStart={popup.eventStart}
              eventEnd={popup.eventEnd}
              variant="compact"
            />
          </div>
        ))}
      </div>
      {popups.length === 0 && <p className="text-center text-gray-500">신청한 팝업이 없습니다.</p>}
    </section>
  );
}
