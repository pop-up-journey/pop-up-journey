'use client';

import CardComponent from '@/components/common/card';
import useHandleSave from '@/hooks/useHandleSave';
import type { PopupWithTags } from '@/types/popup';
import { extractDistrict } from '@/utils/addressFormatter';

interface PopupCardProps {
  event: PopupWithTags;
  userId?: string;
}

export default function PopupCard({ event, userId }: PopupCardProps) {
  const { isSaved, toggle } = useHandleSave(event.id, userId);

  return <CardComponent {...event} address={extractDistrict(event.address)} isSaved={isSaved} onToggleSave={toggle} />;
}
