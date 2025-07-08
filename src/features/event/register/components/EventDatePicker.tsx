'use client';

import Button from '@/components/common/button';
import { Calendar, DateValue, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';

interface EventDatePickerProps {
  label: string;
  value: DateValue | null;
  onChange: (date: DateValue | null) => void;
}

export default function EventDatePicker({ label, value, onChange }: EventDatePickerProps) {
  return (
    <div className="flex items-center space-x-4">
      <label className="font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">{label}</label>
      <Popover placement="bottom">
        <PopoverTrigger>
          <Button>{value ? value.toString() : `${label} 선택`}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar value={value} onChange={onChange} color="primary" />
        </PopoverContent>
      </Popover>
    </div>
  );
}
