'use client';

import { useSaveStore } from '@/store/useSaveStore';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function SessionHandler() {
  const { data: session } = useSession();
  const setSavedStores = useSaveStore((s) => s.setSavedStores);

  useEffect(() => {
    // session이 사라지면(=로그아웃) 관심 팝업 초기화
    if (!session) {
      setSavedStores([]);
    }
  }, [session, setSavedStores]);

  return null;
}
