import EventMapPanel from '@/features/event/detail/components/EventMapPanel';
import { upcomingPopupList } from '@/mock/mockdata';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const popup = upcomingPopupList.find((p) => p.id === Number(id));

  if (!popup) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <EventMapPanel address={popup.region} organizer={popup.organizer} />
    </div>
  );
}
