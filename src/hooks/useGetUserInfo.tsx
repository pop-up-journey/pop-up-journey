'use client';

import { clientApi } from '@/libs/api';
import type { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

//NOTE: 이걸 쓰는 곳이 3곳정도 있어서 context API로 빼는게 좋지 않을까 싶음
// Context API로 빼면 API요청을 줄일 수 있음.
export default function useGetUserInfo() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<User | null>(null);

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

  return { userInfo };
}
