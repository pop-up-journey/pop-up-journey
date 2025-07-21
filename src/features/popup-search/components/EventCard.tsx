'use client';

import CardComponent from '@/components/common/card';
import useHandleSave from '@/hooks/useHandleSave';
import type { PopupWithTags } from '@/types/popup';
import { extractDistrict } from '@/utils/addressFormatter';

interface EventCardProps {
  event: PopupWithTags;
  userId?: string;
}

export default function EventCard({ event, userId }: EventCardProps) {
  const { isSaved, toggle } = useHandleSave(event.id, userId);
  console.log(event);
  return <CardComponent {...event} address={extractDistrict(event.address)} isSaved={isSaved} onToggleSave={toggle} />;
}
