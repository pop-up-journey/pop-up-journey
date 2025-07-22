'use client';

import { categories } from '@/configs/category';
import { Zone, zones } from '@/configs/regions';
import FilteringChip from '@/features/popup-search/components/FilteringChip';
import { useRouter, useSearchParams } from 'next/navigation';

interface PopupFilterProps {
  selectedZone: Zone | null;
  selectedTags: string[];
}

export default function PopupFilter({ selectedZone, selectedTags }: PopupFilterProps) {
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
    <section id="defaultSt" style={{ padding: '2rem', marginBottom: '2rem' }}>
      {/* ──────────────── 지역별 필터 ──────────────── */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-200">지역별</h2>
          <button className="text-sm text-slate-400 hover:text-slate-200" onClick={() => handleSelect(null)}>
            초기화
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          <FilteringChip label="전체" isSelected={!selectedZone} onClick={() => handleSelect(null)} />
          {zones.map((zoneItem) => (
            <FilteringChip
              key={zoneItem}
              label={zoneItem}
              isSelected={selectedZone === zoneItem}
              onClick={() => handleSelect(zoneItem)}
            />
          ))}
        </div>
      </div>
      {/* ───────────── 카테고리 필터 ────────────── */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-200">카테고리</h2>
        <button className="text-sm text-slate-400 hover:text-slate-200" onClick={() => handleTagSelect('')}>
          초기화
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <FilteringChip
            key={category}
            label={category}
            isSelected={selectedTags.includes(category)}
            onClick={() => handleTagSelect(category)}
          />
        ))}
      </div>
    </section>
  );
}
