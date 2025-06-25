interface EventStatusCardProps {
  icon: string;
  title: string;
  status: string;
  views: number;
  likes: number;
  participants: number;
}
export default function EventStatusCard({ icon, title, status, views, likes, participants }: EventStatusCardProps) {
  return (
    <article
      className="flex items-start justify-between border border-gray-200 p-4"
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
            <label>Status: </label>
            {status}
          </p>
        </div>
      </section>
      <aside className="text-right text-sm text-gray-500">
        <p>
          <label>Views: </label>
          {views} | <label>Likes: </label>
          {likes}
          <br />| <label>Participants: </label>
          {participants}
        </p>
      </aside>
    </article>
  );
}
