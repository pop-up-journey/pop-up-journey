import { ComponentType } from 'react';

interface PopupStatusCardProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  status: string;
  views: number;
  likes: number;
  participants: number;
}

export default function PopupStatusCard({
  icon: Icon,
  title,
  status,
  views,
  likes,
  participants,
}: PopupStatusCardProps) {
  return (
    <article
      className="flex items-center justify-between border border-gray-200 p-4"
      aria-label={`Event card: ${title}`}
    >
      <section className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100" aria-hidden>
          <Icon className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <h2 className="font-semibold" aria-label="Event title">
            {title}
          </h2>
          <p className="text-xs text-gray-500">
            <span className="font-medium">운영 상태:</span> {status}
          </p>
        </div>
      </section>
      <aside className="text-right text-sm text-gray-500">
        <dl className="space-y-1">
          <div className="flex justify-between gap-4">
            <dt className="font-medium">조회수:</dt>
            <dd>{views}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-medium">관심등록수:</dt>
            <dd>{likes}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-medium">참여자수:</dt>
            <dd>{participants}</dd>
          </div>
        </dl>
      </aside>
    </article>
  );
}
