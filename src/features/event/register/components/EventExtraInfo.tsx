import Chip from '@/components/common/chip';

interface InfoOption {
  id: string;
  label: string;
}

interface EventExtraInfoProps {
  options: InfoOption[];
  selectedInfo: string[];
  onToggle: (infoId: string) => void;
}

export default function EventExtraInfo({ options, selectedInfo, onToggle }: EventExtraInfoProps) {
  return (
    <div>
      <label className="mb-2 block font-medium">기타 안내 사항</label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {options.map((info) => (
          <Chip
            key={info.id}
            variant={selectedInfo.includes(info.id) ? 'solid' : 'bordered'}
            onClick={() => onToggle(info.id)}
            color={selectedInfo.includes(info.id) ? 'danger' : 'default'}
            className="cursor-pointer"
          >
            {info.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
