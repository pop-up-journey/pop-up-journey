'use client';

import CardComponent from '@/components/common/card';
import { extractDistrict } from '@/utils/addressFormatter';
import { addToast } from '@heroui/react';
import { useEffect, useState } from 'react';
import { deleteParticipation } from '../api/deleteParticipation';
import { ParticipatedPopup, getParticipatedPopups } from '../api/getParticipatedPopups';

export default function MyParticipatedPopupList({ userId }: { userId: string }) {
  const [popups, setPopups] = useState<ParticipatedPopup[]>([]);

  useEffect(() => {
    if (!userId) return;
    getParticipatedPopups(userId).then((res) => setPopups(res));
  }, [userId]);

  const handleDelete = async (eventId: string) => {
    if (!confirm('신청을 취소하시겠습니까?')) return;
    try {
      await deleteParticipation(eventId);
      setPopups((prev) => prev.filter((p) => p.eventId !== eventId));
      addToast({ title: '신청이 취소되었습니다.', color: 'success' });
    } catch {
      addToast({ title: '취소 중 오류 발생. 다시 시도해주세요.', color: 'danger' });
    }
  };

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-bold">신청한 팝업</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {popups.map((popup, idx) => (
          <div key={idx} className="relative">
            <CardComponent
              id={popup.eventId}
              title={popup.title}
              thumbnail={popup.thumbnail}
              address={extractDistrict(popup.address)}
              eventStart={popup.eventStart}
              eventEnd={popup.eventEnd}
              variant="compact"
              onRemoveAction={() => handleDelete(popup.eventId)}
            />
          </div>
        ))}
      </div>
      {popups.length === 0 && <p className="text-center text-gray-500">신청한 팝업이 없습니다.</p>}
    </section>
  );
}
