'use client';

import { Button } from '@heroui/react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Page() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <div className="flex h-screen items-center justify-center gap-10">
      <Button color="primary">Button</Button>
      <Button color="warning">Button</Button>
      <Button color="primary">Button</Button>
      <Button color="primary">Button</Button>
    </div>
  );
}
