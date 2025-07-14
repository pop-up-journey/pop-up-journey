'use client';

import CardComponent from '@/components/common/card';
import type { EventData } from '@/types/event';

interface SavedPopupCardProps {
  popup: EventData;
  userId: string;
  removeFavorite: () => void;
}

export default function SavedPopupCard({ popup, userId, removeFavorite }: SavedPopupCardProps) {
  // compact 모드 + 프로필 전용 삭제 버튼만 활성화
  return (
    <CardComponent
      id={popup.id}
      title={popup.title}
      thumbnail={popup.thumbnail}
      location={popup.address?.split(',').map((s) => s.trim())[2] ?? ''}
      eventStart={popup.eventStart}
      eventEnd={popup.eventEnd}
      variant="compact"
      savedCount={popup.saveCount}
      onRemoveFavorite={removeFavorite}
    />
  );
}
