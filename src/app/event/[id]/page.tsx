import { notFound } from 'next/navigation';
import { upcomingPopupList } from '../../../mock/mockdata';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const popup = upcomingPopupList.find((p) => p.id === Number(id));

  if (!popup) return notFound();

  return (
    <div>
      <h1>{popup.title}</h1>
    </div>
  );
}
