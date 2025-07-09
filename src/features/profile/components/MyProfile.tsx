'use client';

import Button from '@/components/common/button';
import type { User } from '@/types/user';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MyProfileProps {
  userInfo: User;
}
export default function MyProfile({ userInfo }: MyProfileProps) {
  const router = useRouter();

  return (
    <section id="defaultSt" className="mx-auto mt-8 flex items-center justify-between border-b pb-8">
      <div className="flex items-center gap-6">
        {userInfo && userInfo.image && (
          <Image src={userInfo.image} alt="profile" width={80} height={80} className="rounded-full" />
        )}
        <div className="flex-col items-start">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{userInfo && userInfo.name}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded px-2 py-1 font-mono text-xs">{userInfo && userInfo.email}</span>
            <span className="rounded px-2 py-1 font-mono text-xs">{userInfo && userInfo.phone}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onPress={() => router.push('/add-info')}>프로필 수정</Button>
        <Button onPress={() => signOut()}>로그아웃</Button>
      </div>
    </section>
  );
}
