import { auth } from '@/libs/auth';
import type { Session } from 'next-auth';

export const getUserSession = async (): Promise<{ session: Session | null; userId: string | null }> => {
  const session = await auth();
  const userId = session?.user?.id ?? null;

  return { session, userId };
};
