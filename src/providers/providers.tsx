'use client';

import { HeroUIProvider } from '@heroui/react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AuthSyncProvider } from './AuthSyncProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SessionProvider>
          <AuthSyncProvider>{children}</AuthSyncProvider>
        </SessionProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
