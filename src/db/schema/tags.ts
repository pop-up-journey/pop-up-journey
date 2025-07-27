import { categories } from '@/configs/category';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { events } from './events';

// tags 테이블
export const tags = pgTable('tags', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(), // 미리 정의된 카테고리명
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// event_tags 연결 테이블
export const eventTags = pgTable('event_tags', {
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id, { onDelete: 'cascade' }),
  tagId: uuid('tag_id')
    .notNull()
    .references(() => tags.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * @description 태그 생성 시 입력 데이터의 유효성을 검증하는 스키마
 * 미리 정의된 카테고리만 허용
 */
export const createTagSchema = z.object({
  name: z.enum(categories as [string, ...string[]], {
    errorMap: () => ({ message: '미리 정의된 카테고리만 선택할 수 있습니다' }),
  }),
});

/**
 * @description 이벤트-태그 연결 시 입력 데이터의 유효성을 검증하는 스키마
 */
export const createEventTagSchema = z.object({
  eventId: z.string().uuid('올바른 UUID 형식이 아닙니다'),
  tagId: z.string().uuid('올바른 UUID 형식이 아닙니다'),
});

/**
 * @description 이벤트에 여러 태그를 연결할 때 사용하는 스키마
 */
export const createEventTagsSchema = z.object({
  eventId: z.string().uuid('올바른 UUID 형식이 아닙니다'),
  tagIds: z.array(z.string().uuid('올바른 UUID 형식이 아닙니다')).min(1, '최소 1개의 태그를 선택해야 합니다'),
});

export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;
export type EventTag = typeof eventTags.$inferSelect;
export type NewEventTag = typeof eventTags.$inferInsert;
export type CreateTag = z.infer<typeof createTagSchema>;
export type CreateEventTag = z.infer<typeof createEventTagSchema>;
export type CreateEventTags = z.infer<typeof createEventTagsSchema>;
