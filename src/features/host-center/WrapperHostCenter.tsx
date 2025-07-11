'use client';

import HeroSection from '@/components/common/hero-section';
import { getHostEvents } from '@/features/host-center/api/getHostEvents';
import HostEvents from '@/features/host-center/components/HostEvents';
import HostProfile from '@/features/host-center/components/HostProfile';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { type EventData } from '@/types/event';
import { useEffect, useState } from 'react';

export default function WrapperHostCenter() {
  const { userInfo } = useGetUserInfo();
  const [hostEvents, setHostEvents] = useState<EventData[]>([]);

  useEffect(() => {
    if (userInfo) {
      getHostEvents(userInfo.id).then(setHostEvents);
    }
  }, [userInfo]);

  return (
    <main className="mb-10 min-h-screen">
      <HeroSection title="팝업의 여정 호스트 센터" description="이벤트를 주최하고 관리할 수 있습니다." />
      <HostProfile userInfo={userInfo} />
      <HostEvents events={hostEvents} />
    </main>
  );
}
