'use client';

import HeroSection from '@/components/common/hero-section';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '../components/common/button';
import { clientApi } from '../libs/api';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<any>(null);

  const getUserInfo = async () => {
    try {
      if (status === 'authenticated' && session?.user?.id) {
        const res = await clientApi(`/api/users/${session?.user?.id}`, { method: 'GET' });
        console.log(res);
        setUserInfo(res);
      }
    } catch (error) {
      console.error('Failed to get user info', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [session, status]);

  return (
    <main className="min-h-screen">
      <HeroSection
        title={`${userInfo && userInfo[0]?.name}님 환영합니다!`}
        description="프로필과 관심 팝업을 볼 수 있습니다."
      />

      {/* 프로필 */}
      <section id="defaultSt" className="mx-auto mt-8 flex max-w-5xl items-center justify-between border-b pb-8">
        <div className="flex items-center gap-6">
          {userInfo && userInfo[0]?.image && (
            <Image src={userInfo[0]?.image} alt="profile" width={80} height={80} className="rounded-full" />
          )}
          <div className="flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{userInfo && userInfo[0]?.name}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded px-2 py-1 font-mono text-xs">{userInfo && userInfo[0]?.email}</span>
              <span className="rounded px-2 py-1 font-mono text-xs">{userInfo && userInfo[0]?.phone}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button>프로필 수정</Button>
        </div>
      </section>
      <section id="defaultSt" className="mx-auto mt-8 grid max-w-5xl grid-cols-3 gap-6"></section>
    </main>
  );
}
