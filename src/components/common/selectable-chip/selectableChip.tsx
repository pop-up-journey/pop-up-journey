'use client';

import { Chip } from '@heroui/react';

interface Props {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ClickableChip({ label, isSelected, onClick }: Props) {
  return (
    <button type="button" onClick={onClick} className="focus:outline-none">
      <Chip
        className={`cursor-pointer ${
          isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        {label}
      </Chip>
    </button>
  );
}
