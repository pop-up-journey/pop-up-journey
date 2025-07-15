import Button from '@/components/common/button';
import Capacity from '@/features/popup-register/components/form-field/Capacity';
import DateCalendar from '@/features/popup-register/components/form-field/DateCalendar';
import Description from '@/features/popup-register/components/form-field/Description';
import Email from '@/features/popup-register/components/form-field/Email';
import ExtraInfo from '@/features/popup-register/components/form-field/ExtraInfo';
import Location from '@/features/popup-register/components/form-field/Location';
import RecruitmentMethod from '@/features/popup-register/components/form-field/RecruitmentMethod';
import Thumbnail from '@/features/popup-register/components/form-field/Thumbnail';
import Title from '@/features/popup-register/components/form-field/Title';

interface RegisterFormProps {
  hostId: string;
}

export default function RegisterForm({ hostId }: RegisterFormProps) {
  console.log('hostId', hostId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <form id="defaultSt" className="grid grid-cols-1 gap-16 md:grid-cols-2" onSubmit={handleSubmit}>
      <Thumbnail />

      <div className="flex flex-col space-y-6">
        <Title />
        <Email />
        <Description />
        <Capacity />
        <DateCalendar />
        <Location />
        <RecruitmentMethod />
        <ExtraInfo />
        <Button type="submit">등록하기</Button>
      </div>
    </form>
  );
}
