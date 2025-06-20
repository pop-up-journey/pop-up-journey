'use client';

import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';

export default function Page() {
  return (
    <>
      <div className="relative z-10 flex h-screen items-center justify-center gap-10">
        <Input label="Email" />
        <Button>로그인</Button>
      </div>
    </>
  );
}
