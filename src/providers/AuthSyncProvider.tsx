'use client';

import { useAuthStore } from '@/store/auth/useAuthStore';
import { useSaveStore } from '@/store/save/useSaveStore';
import type { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export function AuthSyncProvider({ children }: Props) {
  const { data: session, status } = useSession();
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const setSavedStores = useSaveStore((s) => s.setSavedStores);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setUser(session.user as User);
    } else if (status === 'unauthenticated') {
      logout(); // authStore 초기화
      setSavedStores([]); // 관심 팝업 초기화
    }
  }, [status, session, setUser, logout, setSavedStores]);

  return <>{children}</>;
}
