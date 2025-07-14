// components/profile/SavedPopupCard.tsx
'use client';
import CardComponent from '@/components/common/card';
import useHandleSave from '@/hooks/useHandleSave';
import type { EventData } from '@/types/event';

export default function SavedPopupCard({ popup, userId }: { popup: EventData; userId: string }) {
  // 이 컴포넌트 내부에서는 훅 호출이 고정(1번)입니다.
  const { isSaved, toggle } = useHandleSave(popup.id, userId);

  return (
    <CardComponent
      id={popup.id}
      title={popup.title}
      thumbnail={popup.thumbnail}
      // tags={popup.tags}
      location={popup.address?.split(',').map((s: any) => s.trim())[2] || ''}
      eventStart={popup.eventStart}
      eventEnd={popup.eventEnd}
      isSaved={isSaved}
      onToggleSave={toggle}
      variant="compact" // 혹은 default
      savedCount={popup.saveCount}
    />
  );
}
