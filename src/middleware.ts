import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PROTECTED = ['/profile', '/host-center', '/add-info', '/register', /^\/popup\/[^/]+\/participate(\/.*)?$/];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 보호 대상 경로인지 확인
  const isProtected = PROTECTED.some((p) =>
    typeof p === 'string' ? pathname === p || pathname.startsWith(p + '/') : p.test(pathname)
  );
  if (!isProtected) return NextResponse.next();

  // 로그인 토큰 검사
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (token) return NextResponse.next();

  // 비로그인 시 /auth/required 으로 리다이렉트
  const url = req.nextUrl.clone();
  url.pathname = '/auth/required';
  url.searchParams.set('callbackUrl', pathname);
  return NextResponse.redirect(url);
}
