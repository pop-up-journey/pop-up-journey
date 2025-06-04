'use server';

import { signIn } from 'next-auth/react';

export async function signInAction(provider: string) {
  await signIn(provider, { redirectTo: '/' });
}
