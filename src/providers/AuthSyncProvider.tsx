'use client';

import { useAuthStore } from '@/store/auth/useAuthStore';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { User } from '../types/user';

export function AuthSyncProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as User);
    }
  }, [session, setUser]);

  return <>{children}</>;
}
