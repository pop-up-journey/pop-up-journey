import Input from '@/components/common/input';
import { LABELS } from '@/components/common/input/labels';
import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';

export default function Capacity() {
  const capacity = usePopupRegisterFormStore((state) => state.capacity);
  const setValue = usePopupRegisterFormStore((state) => state.setValue);

  return (
    <Input
      label={LABELS.PEOPLE}
      type="number"
      placeholder="수용 가능한 인원을 입력해주세요."
      value={capacity.toString()}
      onChange={(e) => setValue('capacity', Number(e.target.value))}
    />
  );
}
