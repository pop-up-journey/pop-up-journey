import CardComponent from '@/components/common/card';
import useHandleSave from '@/hooks/useHandleSave';
import type { Popup } from '@/types/popup';

interface UpcomingPopupCardProps {
  popup: Popup;
  userId?: string;
}

export default function UpcomingPopupCard({ popup, userId }: UpcomingPopupCardProps) {
  const { isSaved, toggle } = useHandleSave(popup.id, userId);

  return (
    <CardComponent
      key={popup.id}
      location={popup?.address?.split(',').map((s: string) => s.trim())[2] || ''}
      // savedCount={popup.saveCount}
      isSaved={isSaved}
      onToggleSave={toggle}
      {...popup}
      variant="compact"
    />
  );
}
