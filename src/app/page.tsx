'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import MainPage from '../_pages/MainPage';

export default function Page() {
  return (
    <>
      <div className="relative z-10 flex h-screen items-center justify-center gap-10">
      <div className="relative z-10 flex items-center justify-center gap-10">
        <MainPage />
      </div>
    </>
  );
}
