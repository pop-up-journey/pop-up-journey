'use client';

import { THIRTY_MINUTES } from '@/configs/time';
import { useEffect } from 'react';

function generateUUID() {
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
