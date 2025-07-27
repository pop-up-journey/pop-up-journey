'use client';

import HostPopupList from '@/features/host-center/components/HostPopupList';
import HostPopupStats from '@/features/host-center/components/HostPopupStats';
import { POPUP_STATUS, type PopupStatusType } from '@/features/host-center/services/popupStatus';
import type { Popup } from '@/types/popup';
import { useMemo, useState } from 'react';

interface HostPopupPanelProps {
  hostPopups: Popup[];
}

export default function HostPopupPanel({ hostPopups }: HostPopupPanelProps) {
  const [selectedStatus, setSelectedStatus] = useState<PopupStatusType>(POPUP_STATUS.Ongoing);

  const popupsByStatus = useMemo(
    () => ({
      [POPUP_STATUS.Ongoing]: hostPopups.filter((e) => e.eventStatus === POPUP_STATUS.Ongoing),
      [POPUP_STATUS.Ended]: hostPopups.filter((e) => e.eventStatus === POPUP_STATUS.Ended),
      [POPUP_STATUS.Upcoming]: hostPopups.filter((e) => e.eventStatus === POPUP_STATUS.Upcoming),
    }),
    [hostPopups]
  );

  return (
    <>
      <HostPopupStats
        selectedStatus={selectedStatus}
        onStatusClick={setSelectedStatus}
        ongoing={popupsByStatus[POPUP_STATUS.Ongoing].length}
        ended={popupsByStatus[POPUP_STATUS.Ended].length}
        upcoming={popupsByStatus[POPUP_STATUS.Upcoming].length}
      />

      <HostPopupList selectedStatus={selectedStatus} popups={popupsByStatus[selectedStatus]} />
    </>
  );
}
