import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { roleEnum } from './enums';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }).notNull(),
  image: text('image'),
  role: roleEnum('role').notNull(),
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * @description 데이터베이스에서 사용자 정보를 조회할 때 사용되는 스키마
 */
export const selectUserSchema = createSelectSchema(users);

/**
 * @description 데이터베이스에 새로운 사용자를 생성할 때 사용되는 스키마
 */
export const insertUserSchema = createInsertSchema(users);

/**
 * @description 새로운 사용자 생성 시 입력 데이터의 유효성을 검증하는 스키마
 */
export const createUserSchema = z.object({
  role: z.enum(['admin', 'host', 'participant']),
  name: z.string().min(2, '사용자명은 최소 2글자 이상').max(50, '사용자명은 최대 50글자'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  image: z.string().url('올바른 URL 형식이 아닙니다').optional(),
  phone: z
    .string()
    .regex(/^[0-9-+\s()]*$/, '올바른 전화번호 형식이 아닙니다')
    .optional(),
});

/**
 * @description 사용자 정보를 업데이트할 때 사용되는 스키마
 */
export const updateUserSchema = createUserSchema.partial();

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
