import CurrentPopupList from '@/features/main/components/CurrentPopupList';
import MainBanner from '@/features/main/components/MainBanner';
import UpcomingPopupList from '@/features/main/components/UpcomingPopupList';

export default function MainPage() {
  return (
    <main className="w-100vw space-y-24 overflow-hidden">
      <MainBanner />
      <CurrentPopupList />
      <UpcomingPopupList />
    </main>
  );
}
