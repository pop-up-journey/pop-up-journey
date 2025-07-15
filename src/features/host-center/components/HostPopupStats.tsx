import { POPUP_STATUS, type PopupStatusType } from '@/features/host-center/services/popup-status';

interface HostPopupStatsProps {
  selectedStatus: PopupStatusType;
  onStatusClick: (status: PopupStatusType) => void;
  ongoing: number;
  ended: number;
  upcoming: number;
}

const STATUS_LABELS: { status: PopupStatusType; label: string }[] = [
  { status: POPUP_STATUS.Ongoing, label: '운영중인 팝업' },
  { status: POPUP_STATUS.Ended, label: '종료된 팝업' },
  { status: POPUP_STATUS.Upcoming, label: '예정된 팝업' },
];

export default function HostPopupStats({
  selectedStatus,
  onStatusClick,
  ongoing,
  ended,
  upcoming,
}: HostPopupStatsProps) {
  const stats = { ongoing, ended, upcoming };

  return (
    <section id="defaultSt" className="mx-auto mt-8 grid max-w-5xl grid-cols-3 gap-6">
      {STATUS_LABELS.map(({ status, label }) => (
        <div
          key={status}
          className={`group cursor-pointer rounded-lg p-4 hover:bg-[#ffc0d4] hover:text-black ${
            selectedStatus === status ? 'bg-[#ffc0d4] text-black' : 'bg-gray-50'
          }`}
          onClick={() => onStatusClick(status)}
        >
          <div className="mb-2 text-sm text-gray-500 group-hover:text-black">{label}</div>
          <div className="text-2xl font-bold">{stats[status]}</div>
        </div>
      ))}
    </section>
  );
}
