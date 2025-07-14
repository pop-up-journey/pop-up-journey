'use client';

import HostPopupList from '@/features/host-center/components/HostPopupList';
import HostPopupStats from '@/features/host-center/components/HostPopupStats';
import { POPUP_STATUS_ICON, POPUP_STATUS_LABEL } from '@/features/host-center/services/eventLabelHelpers';
import type { Popup, PopupStatusType } from '@/types/popup';
import { POPUP_STATUS } from '@/types/popup';
import { useMemo, useState } from 'react';

interface HostPopupPanelProps {
  hostEvents: Popup[];
}

export default function HostPopupPanel({ hostEvents }: HostPopupPanelProps) {
  // 클릭한 이벤트 상태
  const [selectedStatus, setSelectedStatus] = useState<PopupStatusType>(POPUP_STATUS.Ongoing);

  // 상태별 배열 캐싱
  const eventsByStatus = useMemo(
    () => ({
      [POPUP_STATUS.Ongoing]: hostEvents.filter((e) => e.eventStatus === POPUP_STATUS.Ongoing),
      [POPUP_STATUS.Ended]: hostEvents.filter((e) => e.eventStatus === POPUP_STATUS.Ended),
      [POPUP_STATUS.Upcoming]: hostEvents.filter((e) => e.eventStatus === POPUP_STATUS.Upcoming),
    }),
    [hostEvents]
  );

  return (
    <>
      <HostPopupStats
        selectedStatus={selectedStatus}
        onStatusClick={setSelectedStatus}
        ongoing={eventsByStatus[POPUP_STATUS.Ongoing].length}
        ended={eventsByStatus[POPUP_STATUS.Ended].length}
        upcoming={eventsByStatus[POPUP_STATUS.Upcoming].length}
      />

      <HostPopupList
        selectedStatus={selectedStatus}
        popups={eventsByStatus[selectedStatus]}
        getEventIcon={(status) => POPUP_STATUS_ICON[status as PopupStatusType]}
        getStatusLabel={(status) => POPUP_STATUS_LABEL[status as PopupStatusType]}
      />
    </>
  );
}
