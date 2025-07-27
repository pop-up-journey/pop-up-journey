import CardComponent from '@/components/common/card';
import useHandleSave from '@/hooks/useHandleSave';
import type { Popup } from '@/types/popup';
import { extractDistrict } from '@/utils/addressFormatter';

interface UpcomingPopupCardProps {
  popup: Popup;
  userId?: string;
}

export default function UpcomingPopupCard({ popup, userId }: UpcomingPopupCardProps) {
  const { isSaved, toggle } = useHandleSave(popup.id, userId);

  return (
    <CardComponent
      key={popup.id}
      {...popup}
      address={extractDistrict(popup?.address)}
      isSaved={isSaved}
      onToggleSave={toggle}
      variant="compact"
    />
  );
}
