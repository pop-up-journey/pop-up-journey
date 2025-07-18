'use client';

import { SignInModalProvider } from '@/features/sign-in/SignInModalContext';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AuthSyncProvider } from './AuthSyncProvider';
import VisitorCookieProvider from './VisitorCookieProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SessionProvider>
          <AuthSyncProvider>
            <SignInModalProvider>
              <VisitorCookieProvider>{children}</VisitorCookieProvider>
            </SignInModalProvider>
          </AuthSyncProvider>
        </SessionProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
