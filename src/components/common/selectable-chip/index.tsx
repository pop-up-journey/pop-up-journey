'use client';

import Chip from '../chip';

interface Props {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ClickableChip({ label, isSelected, onClick }: Props) {
  return (
    <button type="button" onClick={onClick} className="focus:outline-none">
      <Chip size="lg" className={`cursor-pointer ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
        {label}
      </Chip>
    </button>
  );
}
