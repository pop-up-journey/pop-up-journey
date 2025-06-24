import EventMapPanel from '@/features/event/detail/components/EventMapPanel';
import { clientApi } from '@/libs/api';
import { EventData } from '@/types/event';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const event = await clientApi<EventData>(`/api/events/${id}`, { method: 'GET' });
  const place = event.address.split(',').map((s: string) => s.trim());

  if (!event) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <EventMapPanel address={place[1]} organizer={'임시주최자'} />
    </div>
  );
}
