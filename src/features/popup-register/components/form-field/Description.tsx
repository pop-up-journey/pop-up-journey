import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';
import { Textarea } from '@heroui/react';

export default function Description() {
  const description = usePopupRegisterFormStore((state) => state.description);
  const setValue = usePopupRegisterFormStore((state) => state.setValue);

  return (
    <Textarea
      label="이벤트에 대한 상세 설명을 입력해주세요."
      value={description}
      onChange={(e) => setValue('description', e.target.value)}
    />
  );
}
