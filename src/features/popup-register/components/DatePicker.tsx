'use client';

import Button from '@/components/common/button';
import type { DateValue } from '@/types/dateValue';
import { Calendar, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';

interface DatePickerProps {
  label: string;
  value: DateValue;
  onChange: (date: DateValue) => void;
}

export default function DatePicker({ label, value, onChange }: DatePickerProps) {
  return (
    <div className="flex items-center space-x-4">
      <label className="font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">{label}</label>
      <Popover placement="bottom">
        <PopoverTrigger>
          <Button>{value ? value.toString() : `${label} 선택`}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar value={value} onChange={onChange} color="success" />
        </PopoverContent>
      </Popover>
    </div>
  );
}
