'use client';

import { SignInModalProvider } from '@/features/sign-in/SignInModalContext';
import { HeroUIProvider } from '@heroui/react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AuthSyncProvider } from './AuthSyncProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SessionProvider>
          <AuthSyncProvider>
            <SignInModalProvider>{children}</SignInModalProvider>
          </AuthSyncProvider>
        </SessionProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
