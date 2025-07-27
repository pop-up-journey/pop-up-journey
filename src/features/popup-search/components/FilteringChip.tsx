'use client';

import Chip from '@/components/common/chip';

interface FilteringChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function FilteringChip({ label, isSelected, onClick }: FilteringChipProps) {
  return (
    <button type="button" onClick={onClick} className="focus:outline-none">
      <Chip
        size="lg"
        className="cursor-pointer text-[12px] sm:text-[14px]"
        variant={isSelected ? 'solid' : 'bordered'}
        color={isSelected ? 'danger' : 'default'}
      >
        {label}
      </Chip>
    </button>
  );
}
