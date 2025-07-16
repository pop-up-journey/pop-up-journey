import Input from '@/components/common/input';
import { LABELS } from '@/components/common/input/labels';
import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';

export default function Email() {
  const email = usePopupRegisterFormStore((state) => state.email);
  const setValue = usePopupRegisterFormStore((state) => state.setValue);

  return (
    <Input
      label={LABELS.EMAIL}
      type="email"
      placeholder="문의 및 연락받을 이메일을 입력해주세요."
      value={email}
      onChange={(e) => setValue('email', e.target.value)}
    />
  );
}
