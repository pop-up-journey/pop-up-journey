import { pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { events } from './events';
import { users } from './users';

export const eventSave = pgTable(
  'event_save',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    eventId: uuid('event_id')
      .notNull()
      .references(() => events.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => {
    return {
      uniqueUserEvent: unique().on(table.userId, table.eventId),
    };
  }
);

/**
 * @description 데이터베이스에서 이벤트 저장 정보를 조회할 때 사용되는 스키마
 */
export const selectEventSaveSchema = createSelectSchema(eventSave);

/**
 * @description 데이터베이스에 새로운 이벤트 저장을 생성할 때 사용되는 스키마
 */
export const insertEventSaveSchema = createInsertSchema(eventSave);

/**
 * @description 새로운 이벤트 저장 생성 시 입력 데이터의 유효성을 검증하는 스키마
 */
export const createEventSaveSchema = z.object({
  userId: z.string().uuid('올바른 UUID 형식이 아닙니다'),
  eventId: z.string().uuid('올바른 UUID 형식이 아닙니다'),
});

export type EventSave = typeof eventSave.$inferSelect;
export type NewEventSave = typeof eventSave.$inferInsert;
export type CreateEventSave = z.infer<typeof createEventSaveSchema>;
