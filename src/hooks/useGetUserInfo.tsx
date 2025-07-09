'use client';

import { clientApi } from '@/libs/api';
import type { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function useGetUserInfo() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const getUserInfo = async () => {
    try {
      if (status === 'authenticated' && session?.user?.id) {
        const res: User = await clientApi(`/api/users/${session?.user?.id}`, { method: 'GET' });
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
