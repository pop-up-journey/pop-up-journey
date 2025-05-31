'use client';

import { signIn } from 'next-auth/react';

interface SignInButtonProps {
  provider: 'google' | 'naver' | 'kakao';
}

export default function SignInButton({ provider }: SignInButtonProps) {
  return (
    <button
      onClick={() => signIn(provider, { redirectTo: '/' })}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
    >
      {provider}로 로그인
    </button>
  );
}
