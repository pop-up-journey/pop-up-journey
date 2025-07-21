'use client';

import CardComponent from '@/components/common/card';
import { PAGE_SIZE_SIX } from '@/configs/constants';
import { POPUP_STATUS_INFO, type PopupStatusType } from '@/features/host-center/services/popupStatus';
import type { Popup } from '@/types/popup';
import { useEffect, useState } from 'react';
import { useIntersectionObserver } from 'react-haiku';
import { extractDistrict } from '../services/formatLocation';
interface HostPopupListProps {
  popups: Popup[];
  selectedStatus: PopupStatusType;
}

export default function HostPopupList({ popups, selectedStatus }: HostPopupListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE_SIX);

  const { observeRef, isVisible } = useIntersectionObserver({
    options: { threshold: 0.2 },
  });

  useEffect(() => {
    if (isVisible && visibleCount < popups.length) {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE_SIX, popups.length));
    }
  }, [isVisible, visibleCount, popups.length]);

  return (
    <section id="defaultSt" className="mx-auto mt-12 flex max-w-5xl items-center justify-center">
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {popups.length === 0 && <div className="text-white">{POPUP_STATUS_INFO[selectedStatus].message}</div>}
        {popups.slice(0, visibleCount).map((popup, idx) => (
          <li key={popup.id}>
            {/* 
            // TODO: 지우지 마시오 좋아요 수, 참여자 수, 조회수 추가 필요
            {/* // TODO: tags는 추가 해야하고 savedCount도 따로 route 수정해야함 */}
            <CardComponent
              location={extractDistrict(popup?.address)}
              // savedCount={popup.saveCount}
              {...popup}
              variant="compact"
            />
            {idx === visibleCount - 1 && visibleCount < popups.length && (
              <div ref={observeRef as React.RefObject<HTMLDivElement>} className="h-[30px]" />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
