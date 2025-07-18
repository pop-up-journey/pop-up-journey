'use client';

import useResizeUi from '@/hooks/useResizeUi';
import { usePopupSummaryDataStore } from '@/store/popup-summary-data/usePopupSummaryDataStore';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function Searchbar() {
  const [text, setText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { isMdUp } = useResizeUi();
  const { popupSummaryData } = usePopupSummaryDataStore();
  const router = useRouter();

  // 검색 결과 필터링
  const searchResults = useMemo(() => {
    if (!text.trim() || !popupSummaryData) return [];

    const searchTerm = text.toLowerCase();

    return popupSummaryData.filter((popup: any) => {
      const titleMatch = popup.title?.toLowerCase().includes(searchTerm);
      const descriptionMatch = popup.description?.toLowerCase().includes(searchTerm);

      return titleMatch || descriptionMatch;
    });
  }, [text, popupSummaryData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleFocus = () => {
    setIsSearchFocused(true);
  };

  const handleBlur = () => {
    // 검색 결과 클릭을 위해 약간의 지연
    setTimeout(() => setIsSearchFocused(false), 200);
  };

  const handleResultClick = (popupId: string) => {
    router.push(`/popup/${popupId}`);
    setText('');
    setIsSearchFocused(false);
  };

  return (
    <section aria-label="search-input" className="relative flex flex-[3]">
      <div className="relative w-full">
        <MagnifyingGlassIcon className="absolute top-1/2 left-2 z-10 size-5 -translate-y-1/2" />
        <Input
          value={text}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          classNames={{
            inputWrapper: 'pl-8',
          }}
          placeholder="관심있는 팝업을 찾아보세요!"
          type="search"
          size={isMdUp ? 'md' : 'sm'}
        />

        {/* 검색 결과 드롭다운 */}
        {isSearchFocused && text.trim() && searchResults.length > 0 && (
          <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-md border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
            {searchResults.map((popup: any) => (
              <div
                key={popup.id}
                className="cursor-pointer border-b border-white/10 px-4 py-3 last:border-b-0 hover:bg-white/5"
                onClick={() => handleResultClick(popup.id)}
              >
                <div className="font-medium text-white">{popup.title}</div>
              </div>
            ))}
          </div>
        )}

        {/* 검색 결과가 없을 때 */}
        {isSearchFocused && text.trim() && searchResults.length === 0 && (
          <div className="absolute top-full right-0 left-0 z-50 mt-1 rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
            <div className="px-4 py-3 text-center text-white/70">검색 결과가 없습니다.</div>
          </div>
        )}
      </div>
    </section>
  );
}
