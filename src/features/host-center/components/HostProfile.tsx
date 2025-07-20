'use client';

import Button from '@/components/common/button';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import Image from 'next/image';
import Link from 'next/link';

export default function HostProfile() {
  const { userInfo } = useGetUserInfo();

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
        <Link href="/register">
          <Button className="">새로운 이벤트 등록</Button>
        </Link>
        <Link href="/add-info">
          <Button>프로필 수정</Button>
        </Link>
      </div>
    </section>
  );
}
