export default function PopupDetailLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <main
      aria-label="popup-detail-layout"
      className="relative mx-auto flex min-h-screen max-w-6xl justify-evenly space-x-4 px-4 py-10"
    >
      <section className="flex-1">{children}</section>
      <aside className="sticky top-20 hidden self-start lg:block">{sidebar}</aside>
    </main>
  );
}
