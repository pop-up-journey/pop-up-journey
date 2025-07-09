import type { EventStatusType } from '@/types/event';

interface HostEventsStatsProps {
  ongoing: number;
  ended: number;
  upcoming: number;
  onStatusClick: (status: EventStatusType) => void;
}

const STATUS_LABELS: { status: EventStatusType; label: string }[] = [
  { status: 'ongoing', label: '운영중인 팝업' },
  { status: 'ended', label: '종료된 팝업' },
  { status: 'upcoming', label: '예정된 팝업' },
];

export default function HostEventsStats({ ongoing, ended, upcoming, onStatusClick }: HostEventsStatsProps) {
  const stats = { ongoing, ended, upcoming };

  return (
    <section id="defaultSt" className="mx-auto mt-8 grid max-w-5xl grid-cols-3 gap-6">
      {STATUS_LABELS.map(({ status, label }) => (
        <div key={status} className="cursor-pointer rounded-lg bg-gray-50 p-6" onClick={() => onStatusClick(status)}>
          <div className="mb-2 text-sm text-gray-500">{label}</div>
          <div className="text-2xl font-bold">{stats[status]}</div>
        </div>
      ))}
    </section>
  );
}
