'use client';

import { Button } from '@/components/common/button';
import HeroSection from '@/components/common/hero-section';
import { clientApi } from '@/libs/api';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TempMain() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<any>(null);
  const router = useRouter();
  const getUserInfo = async () => {
    try {
      if (status === 'authenticated' && session?.user?.id) {
        const res = await clientApi(`/api/users/${session?.user?.id}`, { method: 'GET' });
        setUserInfo(res);
      }
    } catch (error) {
      console.error('Failed to get user info', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [session, status]);

  console.log(userInfo);

  return (
    <main className="min-h-screen">
      <HeroSection title="팝업의 여정 호스트 센터" description="이벤트를 주최하고 관리할 수 있습니다." />

      {/* 프로필 */}
      <section className="mx-auto mt-8 flex max-w-5xl items-center justify-between border-b pb-8">
        <div className="flex items-center gap-6">
          <Image src={userInfo && userInfo[0]?.image} alt="profile" width={80} height={80} className="rounded-full" />
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
      <section className="mx-auto mt-8 grid max-w-5xl grid-cols-3 gap-6">
        <div className="rounded-lg bg-gray-50 p-6">
          <div className="mb-2 text-sm text-gray-500">Ongoing Events</div>
          <div className="text-2xl font-bold">1</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-6">
          <div className="mb-2 text-sm text-gray-500">Closed Events</div>
          <div className="text-2xl font-bold">1</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-6">
          <div className="mb-2 text-sm text-gray-500">Upcoming Events</div>
          <div className="text-2xl font-bold">1</div>
        </div>
      </section>

      {/* 이벤트 리스트 */}
      <section className="mx-auto mt-12 max-w-5xl">
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
