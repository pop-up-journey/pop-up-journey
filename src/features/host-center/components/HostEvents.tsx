'use client';

import HostEventsList from '@/features/host-center/components/HostEventsList';
import HostEventsStats from '@/features/host-center/components/HostEventsStats';
import { EVENT_STATUS_ICON, EVENT_STATUS_LABEL } from '@/features/host-center/services/eventLabelHelpers';
import type { EventData, EventStatusType } from '@/types/event';
import { EVENT_STATUS } from '@/types/event';
import { useMemo, useState } from 'react';

interface HostEventsProps {
  events: EventData[];
}

export default function HostEvents({ events }: HostEventsProps) {
  // 클릭한 이벤트 상태
  const [selectedStatus, setSelectedStatus] = useState<EventStatusType>(EVENT_STATUS.Ongoing);

  // 상태별 배열 캐싱
  const eventsByStatus = useMemo(
    () => ({
      ongoing: events.filter((e) => e.eventStatus === EVENT_STATUS.Ongoing),
      ended: events.filter((e) => e.eventStatus === EVENT_STATUS.Ended),
      upcoming: events.filter((e) => e.eventStatus === EVENT_STATUS.Upcoming),
    }),
    [events]
  );

  return (
    <>
      <HostEventsStats
        ongoing={eventsByStatus.ongoing.length}
        ended={eventsByStatus.ended.length}
        upcoming={eventsByStatus.upcoming.length}
        onStatusClick={setSelectedStatus}
      />

      <HostEventsList
        events={eventsByStatus[selectedStatus]}
        getEventIcon={(status) => EVENT_STATUS_ICON[status as EventStatusType]}
        getStatusLabel={(status) => EVENT_STATUS_LABEL[status as EventStatusType]}
      />
    </>
  );
}
