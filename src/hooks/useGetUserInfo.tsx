'use client';

import { clientApi } from '@/libs/api';
import type { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

export default function useGetUserInfo() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  // NOTE: 유저 정보 가져오기 client component에서 사용
  const getUserInfo = useCallback(async () => {
    try {
      if (status === 'authenticated' && session?.user?.id) {
        const res: User = await clientApi(`/api/users/${session?.user?.id}`, { method: 'GET' });
        setUserInfo(res);
      }
    } catch (error) {
      console.error('Failed to get user info', error);
    }
  }, [status, session?.user?.id]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return { userInfo };
}
