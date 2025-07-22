import { POPUP_STATUS_INFO, type PopupStatusType } from '@/features/host-center/services/popupStatus';

interface HostPopupStatsProps {
  selectedStatus: PopupStatusType;
  onStatusClick: (status: PopupStatusType) => void;
  ongoing: number;
  ended: number;
  upcoming: number;
}

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
      {Object.values(POPUP_STATUS_INFO).map(({ status, label }) => (
        <div
          key={status}
          className={`group cursor-pointer rounded-lg p-4 hover:bg-[#ffc0d4] hover:text-black ${
            selectedStatus === status ? 'bg-[#ffc0d4] text-black' : 'bg-gray-50'
          }`}
          onClick={() => onStatusClick(status as PopupStatusType)}
        >
          <div className="mb-2 text-sm text-gray-500 group-hover:text-black">{label}</div>
          <div className="text-2xl font-bold">{stats[status as keyof typeof stats]}</div>
        </div>
      ))}
    </section>
  );
}
