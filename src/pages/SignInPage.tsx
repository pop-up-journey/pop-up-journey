'use client';

import SignInButton from '../features/sign-in/components/SignInButton';

export default function SignInPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">로그인</h1>

        <div className="space-y-4">
          <SignInButton provider="google" />

          <SignInButton provider="naver" />

          <SignInButton provider="kakao" />
        </div>
      </div>
    </div>
  );
}
