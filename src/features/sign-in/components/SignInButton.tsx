'use client';

import { signIn } from 'next-auth/react';
import { ProviderLogo } from './ProviderLogo';

interface SignInButtonProps {
  provider: 'google' | 'naver' | 'kakao';
}

export function SignInButton({ provider }: SignInButtonProps) {
  const bgColor = {
    google: 'bg-white text-black border border-gray-300 hover:bg-white/90',
    naver: 'bg-[#02C73D] text-white hover:bg-[#02b152]/90',
    kakao: 'bg-[#FEE500] text-black hover:bg-[#FEE500]/90',
  }[provider];

  const handleSignIn = () => {
    signIn(provider, { redirectTo: '/' });
  };

  return (
    <button
      onClick={handleSignIn}
      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors ${bgColor}`}
    >
      <ProviderLogo provider={provider} />
      {provider.charAt(0).toUpperCase() + provider.slice(1)}로 로그인
    </button>
  );
}

export function SignInButtonList() {
  return (
    <div className="mx-auto flex w-full flex-col gap-3">
      <SignInButton provider="google" />
      <SignInButton provider="naver" />
      <SignInButton provider="kakao" />
    </div>
  );
}
