'use client';

import { categories } from '@/configs/category';
import { Zone, zones } from '@/configs/regions';
import ClickableChip from '@/features/popup-search/components/SelectableChip';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  selectedZone: Zone | null;
  selectedTags: string[];
}

export default function EventsFilter({ selectedZone, selectedTags }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const handleSelect = (zone: Zone | null) => {
    const qp = new URLSearchParams(params.toString());
    if (zone) qp.set('zone', zone);
    else qp.delete('zone');
    router.push(`/popup/search?${qp.toString()}`);
  };

  const handleTagSelect = (tag: string) => {
    const qp = new URLSearchParams(params.toString());
    const current = qp.get('tags');
    if (current === tag) {
      qp.delete('tags');
    } else {
      qp.set('tags', tag);
    }
    router.push(`/popup/search?${qp.toString()}`);
  };

  return (
    <section className="mx-auto my-8 max-w-5xl space-y-6 px-4">
      <div>
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
      </div>
      <div>
        <h1 className="mb-4 text-center text-3xl font-bold">카테고리</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((category) => (
            <ClickableChip
              key={category}
              label={category}
              isSelected={selectedTags[0] === category}
              onClick={() => handleTagSelect(category)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
