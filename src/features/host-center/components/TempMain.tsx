'use client';

import Button from '@/components/common/button';
import HeroSection from '@/components/common/hero-section';
import HostEventStats from '@/features/host-center/components/HostEventStats';
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
      <section id="defaultSt" className="mx-auto mt-12 max-w-5xl">
        <ul className="space-y-6">
          {/* 이벤트 아이템 1 */}
          <li className="flex items-start justify-between border border-gray-200 p-4">
            <div className="flex items-center gap-4">
              {/* 아이콘/썸네일 */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">📅</div>
              <div>
                <div className="font-semibold">Charity Run</div>
                <div className="text-xs text-gray-500">Status: Ongoing</div>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              Views: 150 | Likes: 30
              <br />| Participants: 75
            </div>
          </li>
          {/* 이벤트 아이템 2 */}
          <li className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">🎉</div>
              <div>
                <div className="font-semibold">Annual Gala</div>
                <div className="text-xs text-gray-500">Status: Done</div>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              Views: 300 | Likes: 50
              <br />| Participants: 100
            </div>
          </li>
          {/* 이벤트 아이템 3 */}
          <li className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl">🚀</div>
              <div>
                <div className="font-semibold">Startup Meetup</div>
                <div className="text-xs text-gray-500">Status: Upcoming</div>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              Views: 200 | Likes: 25
              <br />| Participants: 30
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
}
