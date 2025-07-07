interface SectionLayoutProps {
  title: string;
  isEmpty?: boolean;
  children: React.ReactNode;
}

export function SectionLayout({ title, isEmpty, children }: SectionLayoutProps) {
  return (
    <section className="mx-auto mb-10 max-w-6xl px-4">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      {isEmpty ? <div className="py-12 text-center text-gray-400">아직 등록된 팝업이 없습니다.</div> : children}
    </section>
  );
}
