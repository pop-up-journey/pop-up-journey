'use client';

import Button from '@/components/common/button';
import type { User } from '@/types/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HostProfileProps {
  userInfo: User | null;
}

export default function HostProfile({ userInfo }: HostProfileProps) {
  const router = useRouter();

  if (!userInfo) {
    return <div className="flex h-20 items-center justify-center text-gray-400">프로필 정보를 불러오고 있습니다.</div>;
  }

  return (
    <section id="defaultSt" className="mx-auto mt-8 flex max-w-5xl items-center justify-between border-b pb-8">
      <div className="flex items-center gap-6">
        {userInfo.image && <Image src={userInfo.image} alt="profile" width={80} height={80} className="rounded-full" />}
        <div className="flex-col items-start">
          <div className="flex items-center gap-2">
            <div className="mt-1 text-sm text-gray-500">Host: </div>
            <span className="text-xl font-bold">{userInfo.name}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            {userInfo.email && <span className="rounded px-2 py-1 font-mono text-xs">{userInfo.email}</span>}
            {userInfo.phone && <span className="rounded px-2 py-1 font-mono text-xs">{userInfo.phone}</span>}
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => router.push('/event/register')}>새로운 이벤트 등록</Button>
        <Button onClick={() => router.push('/add-info')}>프로필 수정</Button>
      </div>
    </section>
  );
}
