'use client';

import { Zone, zones } from '@/configs/regions';
import ClickableChip from '@/features/popup-search/components/SelectableChip';
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
    <section className="mx-auto my-8 max-w-5xl px-4">
      <h1 className="mb-4 text-center text-3xl font-bold">지역별</h1>
      <div className="flex flex-wrap justify-center gap-6">
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
    </section>
  );
}
