'use client';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/input';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Page() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <>
      <div className="relative z-10 flex h-screen items-center justify-center gap-10">
        <Input label="Email" />
        <Button>로그인</Button>
      </div>
    </>
  );
}
