'use client';

import CardComponent from '@/components/common/card';
import useHandleSave from '@/hooks/useHandleSave';
import type { Popup } from '@/types/popup';

interface EventCardProps {
  event: Popup;
  userId?: string;
}

export default function EventCard({ event, userId }: EventCardProps) {
  const { isSaved, toggle } = useHandleSave(event.id, userId);

  return <CardComponent {...event} isSaved={isSaved} onToggleSave={toggle} />;
}
