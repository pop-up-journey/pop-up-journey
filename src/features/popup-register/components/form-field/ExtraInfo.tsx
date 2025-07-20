import Chip from '@/components/common/chip';
import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { EXTRA_INFO_OPTIONS } from '../../../../configs/extraInfoLabelHelper';

export default function ExtraInfo() {
  const extraInfo = usePopupRegisterFormStore((state) => state.extraInfo);
  const setExtraInfo = usePopupRegisterFormStore((state) => state.setExtraInfo);

  const handleToggle = (infoId: string) => {
    if (extraInfo.includes(infoId)) {
      setExtraInfo(extraInfo.filter((id) => id !== infoId));
    } else {
      setExtraInfo([...extraInfo, infoId]);
    }
  };

  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-[14px] font-semibold text-white">
        <InformationCircleIcon className="size-5" />
        기타 안내 사항
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {EXTRA_INFO_OPTIONS.map((info) => (
          <Chip
            key={info.id}
            variant={extraInfo.includes(info.id) ? 'solid' : 'bordered'}
            onClick={() => handleToggle(info.id)}
            color={extraInfo.includes(info.id) ? 'danger' : 'default'}
            className="cursor-pointer"
          >
            {info.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
