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

export default function RegisterForm() {
  return (
    <form id="defaultSt" className="grid grid-cols-1 gap-16 md:grid-cols-2">
      <Thumbnail />

      <div className="flex flex-col space-y-6">
        <Title />
        <Email />

        {/* TODO: Text area 사용자가 작성할 때 입력창이 커지거나 따로 모달로 나오던가 해서 UX를 좀 향상시켜야함 지금
          텍스트 창 너무 작음 */}
        {/* TODO: 본문은 아마 텍스트에디터를 쓰거나 마크업언어를 쓸 수 있도록 해야 할 듯.. */}
        <Description />
        <Capacity />
        <DateCalendar />
        <Location />

        {/* TODO: 외부링크로 받을 경우에 링크 입력 할 수 있게 만들어줘야할듯 */}
        <RecruitmentMethod />

        <ExtraInfo />

        <Button type="submit">등록하기</Button>
      </div>
    </form>
  );
}
