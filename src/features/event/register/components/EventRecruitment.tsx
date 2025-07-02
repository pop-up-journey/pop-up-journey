import { Checkbox, CheckboxGroup } from '@heroui/react';

interface EventRecruitmentProps {
  selectedMethods: string[];
  onChange: (methods: string[]) => void;
}
export default function EventRecruitment({ selectedMethods, onChange }: EventRecruitmentProps) {
  return (
    <div>
      <label className="mb-2 block font-medium">참가자 모집 방법</label>
      <CheckboxGroup
        color="primary"
        value={selectedMethods}
        onValueChange={onChange}
        orientation="horizontal"
        classNames={{
          wrapper: 'gap-20',
        }}
      >
        <Checkbox value="auto">자동 신청</Checkbox>
        <Checkbox value="manual">외부 신청 링크</Checkbox>
      </CheckboxGroup>
    </div>
  );
}
