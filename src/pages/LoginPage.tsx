'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">로그인</h1>

        <div className="space-y-4">
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            <img src="/google.svg" alt="Google" className="h-5 w-5" />
            Google로 로그인
          </button>

          <button
            onClick={() => signIn('naver', { callbackUrl: '/' })}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#03C75A] px-4 py-2 text-white transition-colors hover:bg-[#02b351]"
          >
            <img src="/naver.svg" alt="Naver" className="h-5 w-5" />
            네이버로 로그인
          </button>

          <button
            onClick={() => signIn('kakao', { callbackUrl: '/' })}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FEE500] px-4 py-2 text-[#000000] transition-colors hover:bg-[#FDD835]"
          >
            <img src="/kakao.svg" alt="Kakao" className="h-5 w-5" />
            카카오로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
