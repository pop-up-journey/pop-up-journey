import Input from '@/components/common/input';
import { LABELS } from '@/components/common/input/labels';
import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Radio, RadioGroup } from '@heroui/react';

export default function RecruitmentMethod() {
  const recruitmentMethod = usePopupRegisterFormStore((state) => state.recruitmentMethod);
  const externalLink = usePopupRegisterFormStore((state) => state.externalLink);
  const setValue = usePopupRegisterFormStore((state) => state.setValue);

  const radioClassNames = {
    label: 'text-[14px] text-white',
  };
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-[14px] font-semibold text-white">
        <PencilSquareIcon className="size-5" />
        2참가자 모집 방법
      </label>
      <RadioGroup
        color="success"
        value={recruitmentMethod}
        onValueChange={(value) => setValue('recruitmentMethod', value)}
      >
        <Radio value="auto" classNames={radioClassNames}>
          자동 신청
        </Radio>
        <Radio value="manual" classNames={radioClassNames}>
          외부 신청 링크
        </Radio>
      </RadioGroup>
      {recruitmentMethod === 'manual' && (
        <Input
          label={LABELS.LINK}
          className="mt-2"
          type="url"
          placeholder="외부 신청 링크를 입력하세요"
          value={externalLink}
          onChange={(e) => setValue('externalLink', e.target.value)}
        />
      )}
    </div>
  );
}
