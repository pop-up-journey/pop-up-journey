'use client';

import { THIRTY_MINUTES } from '@/configs/time';
import { useEffect } from 'react';

function generateUUID() {
  // 필요하면 env. COOKIE_SECRET 사용
  return crypto.randomUUID();
}

export default function VisitorCookieProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const cookieName = 'popup_journey_visitor';
    const existing = document.cookie.split('; ').find((row) => row.startsWith(cookieName + '='));
    if (!existing) {
      const uuid = generateUUID();
      const expires = new Date(Date.now() + THIRTY_MINUTES).toUTCString();
      document.cookie = `${cookieName}=${uuid}; path=/; expires=${expires}; SameSite=Lax`;
    }
  }, []);
  return children;
}
