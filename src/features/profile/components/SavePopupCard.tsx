'use client';

import CardComponent from '@/components/common/card';
import type { Popup } from '@/types/popup';
import { extractDistrict } from '@/utils/addressFormatter';

interface SavedPopupCardProps {
  popup: Popup;
  userId: string;
  removeFavorite: () => void;
}

export default function SavedPopupCard({ popup, removeFavorite }: SavedPopupCardProps) {
  // compact 모드 + 프로필 전용 삭제 버튼만 활성화
  return (
    <CardComponent
      id={popup.id}
      title={popup.title}
      thumbnail={popup.thumbnail}
      address={extractDistrict(popup.address)}
      eventStart={popup.eventStart}
      eventEnd={popup.eventEnd}
      variant="compact"
      onRemoveAction={removeFavorite}
    />
  );
}
