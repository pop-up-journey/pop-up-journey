interface PopupStatusCardProps {
  icon: string;
  title: string;
  status: string;
  views: number;
  likes: number;
  participants: number;
}
export default function PopupStatusCard({ icon, title, status, views, likes, participants }: PopupStatusCardProps) {
  return (
    <article
      className="flex items-center justify-between border border-gray-200 p-4"
      aria-label={`Event card: ${title}`}
    >
      <section className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl" aria-hidden>
          {icon}
        </div>
        <div>
          <h2 className="font-semibold" aria-label="Event title">
            {title}
          </h2>
          <p className="text-xs text-gray-500">
            <label>운영 상태 : </label>
            {status}
          </p>
        </div>
      </section>
      <aside className="text-right text-sm text-gray-500">
        <p>
          <label>조회수: </label>
          {views} | <label>관심등록수: </label>
          {likes}
          <br />
          <label>참여자수: </label>
          {participants}
        </p>
      </aside>
    </article>
  );
}
