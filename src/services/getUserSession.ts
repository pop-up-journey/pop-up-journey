import { auth } from '@/libs/auth';
import type { Session } from 'next-auth';

// NOTE: 유저 세션 가져오기 server component에서 사용
// user의 id가 필요한 경우 사용하기
export const getUserSession = async (): Promise<Session | null> => {
  const session = await auth();

  return session;
};
