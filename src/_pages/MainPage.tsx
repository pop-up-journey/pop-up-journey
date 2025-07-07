import CurrentPopupList from '@/features/main/components/CurrentPopupList';
import MainBanner from '@/features/main/components/MainBanner';
import UpcomingPopupList from '@/features/main/components/UpcomingPopupList';
import { clientApi } from '@/libs/api';
import { auth } from '@/libs/auth';

export async function getEvents({ status }: { status: string }) {
  return await clientApi(`/api/events?status=${status}`, {
    method: 'GET',
  });
}

export async function getUserLikedEventIds(userId: string) {
  return await clientApi(`/api/like?userId=${userId}`, {
    method: 'GET',
  });
}

export default async function MainPage() {
  const session = await auth();
  const currentEvents = await getEvents({ status: 'ongoing' });
  const upcomingEvents = await getEvents({ status: 'upcoming' });
  let likedEventIds: number[] = [];
  if (session?.user?.id) {
    likedEventIds = await getUserLikedEventIds(session.user.id);
  }
  return (
    <main className="w-100vw space-y-24 overflow-hidden">
      <MainBanner />
      <CurrentPopupList events={currentEvents} likeEventIds={likedEventIds} />
      <UpcomingPopupList events={upcomingEvents} />
    </main>
  );
}
