'use client';

import HeroSection from '@/components/common/hero-section';
import HostEventsList from '@/features/host-center/components/HostEventsList';
import HostEventStats from '@/features/host-center/components/HostEventStats';
import HostProfile from '@/features/host-center/components/HostProfile';
import { EVENT_STATUS_ICON, EVENT_STATUS_LABEL } from '@/features/host-center/services/eventLabelHelpers';
import { getHostEvents } from '@/features/host-center/services/getHostEvents';
import { getUserInfo } from '@/features/host-center/services/getUserInfo';
import { EVENT_STATUS, type EventData, type EventStatusType } from '@/types/event';
import type { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';

export default function HostCenterPage() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [hostEvents, setHostEvents] = useState<EventData[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<EventStatusType>(EVENT_STATUS.Ongoing);

  // HACK: unused value에 대한 에러 방지용 콘솔
  // console.log(hostEvents);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      getUserInfo(session.user.id).then((res) => {
        setUserInfo(res[0] ?? null);
      });
      getHostEvents(session.user.id).then(setHostEvents);
    }
  }, [session, status]);

  const eventsByStatus = useMemo(() => {
    return {
      ongoing: hostEvents.filter((e) => e.eventStatus === EVENT_STATUS.Ongoing),
      ended: hostEvents.filter((e) => e.eventStatus === EVENT_STATUS.Ended),
      upcoming: hostEvents.filter((e) => e.eventStatus === EVENT_STATUS.Upcoming),
    };
  }, [hostEvents]);

  function handleStatusClick(status: EventStatusType) {
    setSelectedStatus(status);
  }

  return (
    <main className="min-h-screen">
      <HeroSection title="팝업의 여정 호스트 센터" description="이벤트를 주최하고 관리할 수 있습니다." />

      {/* 프로필 */}
      <HostProfile userInfo={userInfo} />

      {/* 이벤트 통계 영역 */}
      <HostEventStats
        ongoing={eventsByStatus.ongoing.length}
        ended={eventsByStatus.ended.length}
        upcoming={eventsByStatus.upcoming.length}
        onStatusClick={handleStatusClick}
      />

      {/* 이벤트 리스트 */}
      <HostEventsList
        events={eventsByStatus[selectedStatus]}
        getEventIcon={(status) => EVENT_STATUS_ICON[status as EventStatusType]}
        getStatusLabel={(status) => EVENT_STATUS_LABEL[status as EventStatusType]}
      />
    </main>
  );
}
