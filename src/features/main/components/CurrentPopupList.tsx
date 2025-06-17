import CardComponent from '../../../components/common/card';
import { upcomingPopupList } from '../../../mock/mockdata';

export default function CurrentPopupList() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <h2 className="mb-8 text-2xl font-bold">지금! 서울 인기 팝업</h2>
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
        {upcomingPopupList.map((popup) => (
          <CardComponent
            key={popup.id}
            title={popup.title}
            thumbnail={popup.thumbnail}
            tags={popup.tags}
            date={popup.date}
          />
        ))}
      </div>
    </section>
  );
}
