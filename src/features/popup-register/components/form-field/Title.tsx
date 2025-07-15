import Input from '@/components/common/input';
import { LABELS } from '@/components/common/input/labels';
import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';

export default function Title() {
  const title = usePopupRegisterFormStore((state) => state.title);
  const setValue = usePopupRegisterFormStore((state) => state.setValue);

  return (
    <Input
      label={LABELS.TITLE}
      type="text"
      value={title}
      onChange={(e) => setValue('title', e.target.value)}
      placeholder="개최하실 팝업 제목을 입력해주세요."
    />
  );
}
