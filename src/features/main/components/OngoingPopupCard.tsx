'use client';

import CardComponent from '@/components/common/card';
import useHandleSave from '@/hooks/useHandleSave';
import type { Popup } from '@/types/popup';
import { extractDistrict } from '@/utils/addressFormatter';

interface OngoingPopupCardProps {
  popup: Popup;
  userId?: string;
}

export default function OngoingPopupCard({ popup, userId }: OngoingPopupCardProps) {
  const { isSaved, toggle } = useHandleSave(popup.id, userId);

  return <CardComponent {...popup} address={extractDistrict(popup.address)} isSaved={isSaved} onToggleSave={toggle} />;
}
