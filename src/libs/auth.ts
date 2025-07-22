import db from '@/db';
import { accounts, sessions, users, verificationTokens } from '@/db/schema';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  trustHost: true,

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Naver({
      clientId: process.env.AUTH_NAVER_ID!,
      clientSecret: process.env.AUTH_NAVER_SECRET!,
    }),
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID!,
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user = session.user || {};
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  // callbacks: {
  //   async signIn({ user, account, profile }) {
  //     if (!user.email) return false;

  //     // Check if user exists
  //     const existingUser = await db.select().from(users).where(eq(users.email, user.email)).limit(1);

  //     if (existingUser.length === 0) {
  //       // Create new user
  //       await db.insert(users).values({
  //         email: user.email,
  //         name: user.name || '',
  //         image: user.image,
  //         role: 'participant', // default role
  //       });
  //     }

  //     return true;
  //   },
  //   async jwt({ token, user }) {
  //     // 로그인 시 user가 존재, 이후에는 token만 존재
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (token?.id) {
  //       session.user = session.user || {};
  //       session.user.id = token.id as string;
  //     }
  //     return session;
  //   },
  // },
  // session: {
  //   strategy: 'jwt',
  // },
});
