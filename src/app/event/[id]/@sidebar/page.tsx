import EventMapPanel from '@/features/event/detail/components/EventMapPanel';
import { clientApi } from '@/libs/api';
import { EventData } from '@/types/event';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}
interface UserData {
  id: string;
  name: string;
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  const event = await clientApi<EventData>(`/api/events/${id}`, { method: 'GET' });
  const place = event.address.split(',').map((s: string) => s.trim())[1];

  const host = await clientApi<UserData>(`/api/users/${event.hostId}`, { method: 'GET' });
  const hostName = host[0].name;

  if (!event) return notFound();
  if (!host) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <EventMapPanel address={place} organizer={hostName} />
    </div>
  );
}
