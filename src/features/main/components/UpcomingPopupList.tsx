export default function UpcomingPopupList() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <h2 className="mb-8 text-2xl font-bold">오픈 예정 팝업</h2>
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
        {/* {upcomingPopupList.map((popup) => (
          <CardComponent
            key={popup.id}
            title={popup.title}
            thumbnail={popup.thumbnail}
            tags={popup.tags}
            date={popup.date}
          />
        ))} */}
      </div>
    </section>
  );
}
