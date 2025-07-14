'use client';

import HostPopupList from '@/features/host-center/components/HostPopupList';
import HostPopupStats from '@/features/host-center/components/HostPopupStats';
import { EVENT_STATUS_ICON, EVENT_STATUS_LABEL } from '@/features/host-center/services/eventLabelHelpers';
import type { EventData, EventStatusType } from '@/types/event';
import { EVENT_STATUS } from '@/types/event';
import { useMemo, useState } from 'react';

interface HostPopupPanelProps {
  hostEvents: EventData[];
}

export default function HostPopupPanel({ hostEvents }: HostPopupPanelProps) {
  // 클릭한 이벤트 상태
  const [selectedStatus, setSelectedStatus] = useState<EventStatusType>(EVENT_STATUS.Ongoing);

  // 상태별 배열 캐싱
  const eventsByStatus = useMemo(
    () => ({
      [EVENT_STATUS.Ongoing]: hostEvents.filter((e) => e.eventStatus === EVENT_STATUS.Ongoing),
      [EVENT_STATUS.Ended]: hostEvents.filter((e) => e.eventStatus === EVENT_STATUS.Ended),
      [EVENT_STATUS.Upcoming]: hostEvents.filter((e) => e.eventStatus === EVENT_STATUS.Upcoming),
    }),
    [hostEvents]
  );

  return (
    <>
      <HostPopupStats
        ongoing={eventsByStatus[EVENT_STATUS.Ongoing].length}
        ended={eventsByStatus[EVENT_STATUS.Ended].length}
        upcoming={eventsByStatus[EVENT_STATUS.Upcoming].length}
        onStatusClick={setSelectedStatus}
      />

      <HostPopupList
        events={eventsByStatus[selectedStatus]}
        getEventIcon={(status) => EVENT_STATUS_ICON[status as EventStatusType]}
        getStatusLabel={(status) => EVENT_STATUS_LABEL[status as EventStatusType]}
      />
    </>
  );
}
