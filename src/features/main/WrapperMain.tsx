import MainBanner from '@/features/main/components/MainBanner';
import OngoingPopupList from '@/features/main/components/OngoingPopupList';
import UpcomingPopupList from '@/features/main/components/UpcomingPopupList';
import { PopupsResponse } from '@/services/getPopups';
// import { Popup } from '@/types/popup';

export default async function WrapperMain({
  ongoingEvents,
  upcomingEvents,
  likedEventIds,
}: {
  ongoingEvents: PopupsResponse;
  upcomingEvents: PopupsResponse;
  likedEventIds: string[];
}) {
  return (
    <main className="overflow-hidden">
      <MainBanner />
      <OngoingPopupList sectionTitle="지금 인기있는 팝업!" events={ongoingEvents.events} likeEventIds={likedEventIds} />
      <UpcomingPopupList
        sectionTitle="오픈 예정 팝업"
        initialEvents={upcomingEvents.events}
        initialCount={upcomingEvents.totalCount}
      />
    </main>
  );
}
