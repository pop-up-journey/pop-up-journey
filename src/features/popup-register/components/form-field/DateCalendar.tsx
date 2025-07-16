import DatePicker from '@/features/popup-register/components/DatePicker';
import { usePopupRegisterFormStore } from '@/store/popup-register/usePopupRegisterFormStore';

export default function DateCalendar() {
  const { eventStart, eventEnd } = usePopupRegisterFormStore();
  const { setDate } = usePopupRegisterFormStore.getState();

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-20">
      <DatePicker label="시작일" value={eventStart} onChange={(date) => setDate('eventStart', date)} />
      <DatePicker label="종료일" value={eventEnd} onChange={(date) => setDate('eventEnd', date)} />
    </div>
  );
}
