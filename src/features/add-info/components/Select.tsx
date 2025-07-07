'use client';

import { roles } from '@/configs/roles';
import { useAddInfoFormStore } from '@/store/add-info/useAddInfoFormStore';
import { Select as HerouiSelect, SelectItem } from '@heroui/react';

export default function Select() {
  const value = useAddInfoFormStore((state) => state['role' as keyof typeof state]);
  const setField = useAddInfoFormStore((state) => state.setValue);

  return (
    <HerouiSelect
      name="role"
      items={roles}
      label="역할"
      placeholder="참여하실 역할을 선택해주세요."
      value={value as string}
      color="primary"
      onChange={(e) => setField('role', e.target.value)}
      variant="underlined"
      classNames={{
        label: 'text-black dark:text-white/90',
        listbox: 'text-black dark:text-white/90',
      }}
    >
      {(role) => <SelectItem>{role.label}</SelectItem>}
    </HerouiSelect>
  );
}
