'use client';

import HeroSection from '@/components/common/hero-section';
import HostEvents from '@/features/host-center/components/HostEvents';
import HostProfile from '@/features/host-center/components/HostProfile';
import { getHostEvents } from '@/features/host-center/services/getHostEvents';
import { getUserInfo } from '@/features/host-center/services/getUserInfo';
import { type EventData } from '@/types/event';
import type { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function WrapperHostCenter() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [hostEvents, setHostEvents] = useState<EventData[]>([]);

  // HACK: unused value에 대한 에러 방지용 콘솔
  // console.log(hostEvents);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      getUserInfo(session.user.id).then((res) => {
        setUserInfo(res ?? null);
      });
      getHostEvents(session.user.id).then(setHostEvents);
    }
  }, [session, status]);

  return (
    <main className="mb-10 min-h-screen">
      <HeroSection title="팝업의 여정 호스트 센터" description="이벤트를 주최하고 관리할 수 있습니다." />
      <HostProfile userInfo={userInfo} />
      <HostEvents events={hostEvents} />
    </main>
  );
}
