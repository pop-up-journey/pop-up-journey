'use client';

import CardComponent from '@/components/common/card';
import useHandleSave from '@/hooks/useHandleSave';
import type { Popup } from '@/types/popup';

interface PopupSlideCardProps {
  popup: Popup;
  userId?: string;
}

export default function PopupSlideCard({ popup, userId }: PopupSlideCardProps) {
  const { isSaved, toggle } = useHandleSave(popup.id, userId);

  return <CardComponent {...popup} isSaved={isSaved} onToggleSave={toggle} />;
}
