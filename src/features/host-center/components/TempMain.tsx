'use client';

import Button from '@/components/common/button';
import HeroSection from '@/components/common/hero-section';
import HostEventsList from '@/features/host-center/components/HostEventsList';
import HostEventStats from '@/features/host-center/components/HostEventStats';
import { getEventIcon, getStatusLabel } from '@/features/host-center/services/eventLabelHelpers';
import { getHostEvents } from '@/features/host-center/services/getHostEvents';
import { getUserInfo } from '@/features/host-center/services/getUserInfo';
import type { EventData } from '@/types/event';
import type { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function TempMain() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<User[]>([]);
  const [hostEvents, setHostEvents] = useState<EventData[]>([]);
  const router = useRouter();

  // HACK: unused value에 대한 에러 방지용 콘솔
  // regist 페이지 후에 데이터 연결 할 것
  // console.log(hostEvents);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      getUserInfo(session.user.id).then(setUserInfo);
    }
  }, [session, status]);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      getHostEvents(session.user.id).then(setHostEvents);
    }
  }, [session, status]);

  const events = useMemo(() => {
    return {
      ongoing: hostEvents.filter((e) => e.eventStatus === 'ongoing'),
      ended: hostEvents.filter((e) => e.eventStatus === 'ended'),
      upcoming: hostEvents.filter((e) => e.eventStatus === 'upcoming'),
    };
  }, [hostEvents]);

  return (
    <main className="min-h-screen">
      <HeroSection title="팝업의 여정 호스트 센터" description="이벤트를 주최하고 관리할 수 있습니다." />

      {/* 프로필 */}
      <section id="defaultSt" className="mx-auto mt-8 flex max-w-5xl items-center justify-between border-b pb-8">
        <div className="flex items-center gap-6">
          {userInfo && userInfo[0]?.image && (
            <Image src={userInfo[0]?.image} alt="profile" width={80} height={80} className="rounded-full" />
          )}
          <div className="flex-col items-start">
            <div className="flex items-center gap-2">
              <div className="mt-1 text-sm text-gray-500">Host: </div>
              <span className="text-xl font-bold">{userInfo && userInfo[0]?.name}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded px-2 py-1 font-mono text-xs">{userInfo && userInfo[0]?.email}</span>
              <span className="rounded px-2 py-1 font-mono text-xs">{userInfo && userInfo[0]?.phone}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => router.push('/event/register')}>새로운 이벤트 등록</Button>
          <Button>프로필 수정</Button>
        </div>
      </section>

      {/* 이벤트 통계 영역 */}
      <HostEventStats ongoing={events.ongoing.length} ended={events.ended.length} upcoming={events.upcoming.length} />

      {/* 이벤트 리스트 */}
      <HostEventsList events={hostEvents} getEventIcon={getEventIcon} getStatusLabel={getStatusLabel} />
    </main>
  );
}
