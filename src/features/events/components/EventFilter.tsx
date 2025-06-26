'use client';

import ClickableChip from '@/components/common/selectable-chip/selectableChip';
import { Zone, zones } from '@/configs/regions';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  selectedZone: Zone | null;
}

export default function EventsFilter({ selectedZone }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const handleSelect = (zone: Zone | null) => {
    const qp = new URLSearchParams(params.toString());
    if (zone) qp.set('zone', zone);
    else qp.delete('zone');
    router.push(`/events?${qp.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <ClickableChip label="전체" isSelected={!selectedZone} onClick={() => handleSelect(null)} />
      {zones.map((zoneItem) => (
        <ClickableChip
          key={zoneItem}
          label={zoneItem}
          isSelected={selectedZone === zoneItem}
          onClick={() => handleSelect(zoneItem)}
        />
      ))}
    </div>
  );
}
