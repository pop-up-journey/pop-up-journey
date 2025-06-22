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
      {/* 이제 이 페이지에는 단 하나의 Map만 렌더링됩니다 */}
      <EventMapPanel address={popup.region} />
    </div>
  );
}
