import Image from 'next/image';
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
    <section>
      {/* <div className="mb-4 flex justify-center"> */}
      <Image src={popup.thumbnail} alt={popup.title} width={400} height={500} />
      {/* </div> */}
      <p className="mb-2 text-sm text-gray-500">{popup.date}</p>
      <p className="mb-2 text-lg font-semibold">{popup.region}</p>
      <h1>{popup.title}</h1>
    </section>
  );
}
