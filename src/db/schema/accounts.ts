import { integer, pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';
import { users } from './users';

export const accounts = pgTable(
  'accounts',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  // ✅ provider와 providerAccountId의 조합으로 유일한 외부 계정을 식별한다.
  // ✅ 이 조합은 중복되면 안 되므로 기본 키로 설정한다.
  // ✅ 이 구조는 여러 로그인 제공자를 지원할 때 매우 일반적인 방식이다.
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);
