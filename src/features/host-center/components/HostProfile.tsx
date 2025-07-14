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
    <section
      id="defaultSt"
      className="mx-auto mt-8 flex max-w-5xl items-center justify-between border-b px-4 pb-8 sm:px-6"
    >
      <div className="flex items-center gap-6">
        {userInfo.image && <Image src={userInfo.image} alt="profile" width={80} height={80} className="rounded-full" />}
        <div className="flex-col items-start">
          <div className="flex items-center gap-2">
            <span className="mt-1 text-sm text-gray-500">Host: </span>
            <span className="text-xl font-bold">{userInfo.name}</span>
          </div>
          <div className="mt-4 flex flex-col gap-4 md:flex-row">
            {userInfo.email && <span className="rounded font-mono text-xs">{userInfo.email}</span>}
            {userInfo.phone && <span className="rounded font-mono text-xs">{userInfo.phone}</span>}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <Button className="" onClick={() => router.push('/register')}>
          새로운 이벤트 등록
        </Button>
        <Button onClick={() => router.push('/add-info')}>프로필 수정</Button>
      </div>
    </section>
  );
}
