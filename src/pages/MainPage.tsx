import CurrentPopupList from '../features/main/components/CurrentPopupList';
import HeroSection from '../features/main/components/HeroSection';
import UpcomingPopupList from '../features/main/components/UpcomingPopupList';

export default function MainPage() {
  return (
    <main className="m space-y-24">
      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Features */}
      <CurrentPopupList />

      {/* Section 3: Popup List */}
      <UpcomingPopupList />
      {/* Section 4: Footer (if needed) */}
    </main>
  );
}
