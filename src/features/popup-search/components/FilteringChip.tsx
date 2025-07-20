'use client';

import Chip from '@/components/common/chip';

interface Props {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

// NOTE: 태그 & 지역 필터링 칩 컴포넌트
// TODO: 네이밍 변경 필요
export default function FilteringChip({ label, isSelected, onClick }: Props) {
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
