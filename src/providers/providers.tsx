'use client';

import { HeroUIProvider } from '@heroui/react';
import { SessionProvider } from 'next-auth/react';
import { AuthSyncProvider } from './AuthSyncProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <SessionProvider>
        <AuthSyncProvider>{children}</AuthSyncProvider>
      </SessionProvider>
    </HeroUIProvider>
  );
}
