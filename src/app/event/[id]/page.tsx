import { Divider } from '@heroui/react';
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

      <strong className="mt-4 mb-2 inline-block text-3xl">{popup.title}</strong>
      {/* <Divider className="my-4" /> */}
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-12 w-12 flex-col overflow-hidden rounded border text-center text-xs shadow-sm">
          <div className="bg-gray-600/30 py-[2px] text-[10px] leading-none text-gray-500">6월</div>
          <div className="bg-transparent py-[4px] text-base font-semibold text-black">22일</div>
        </div>
        <p className="text-sm text-gray-500">{popup.date}</p>
      </div>
      <p className="mb-2 text-sm text-gray-500">{popup.region}</p>
      <Divider className="my-4" />
    </section>
  );
}
