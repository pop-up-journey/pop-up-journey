import Link from 'next/link';

interface SectionLayoutProps {
  title: string;
  isEmpty?: boolean;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}

export function SectionLayout({ title, isEmpty, rightSlot, children }: SectionLayoutProps) {
  return (
    <section className="mx-auto mb-10 max-w-6xl px-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link href="/events">
          <p className="text-sm">{rightSlot}</p>
        </Link>
      </div>
      {isEmpty ? <div className="py-12 text-center text-gray-400">아직 등록된 팝업이 없습니다.</div> : children}
    </section>
  );
}
