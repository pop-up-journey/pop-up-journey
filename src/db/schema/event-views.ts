import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { events } from './events';

export const eventViews = pgTable('event_views', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id, { onDelete: 'cascade' }),
  visitorId: text('visitor_id').notNull(), // 쿠키 기반 방문자 ID
  userAgent: text('user_agent'), // 브라우저 정보
  viewedAt: timestamp('viewed_at', { mode: 'string' }).defaultNow().notNull(),
  isProcessed: integer('is_processed').default(0).notNull(), // 배치 처리 여부 (0: 미처리, 1: 처리됨)
});

export const eventViewCounts = pgTable('event_view_counts', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id, { onDelete: 'cascade' }),
  viewCount: integer('view_count').default(0).notNull(),
  lastUpdated: timestamp('last_updated', { mode: 'string' }).defaultNow().notNull(),
});

// Zod 스키마
export const selectEventViewSchema = createSelectSchema(eventViews);
export const insertEventViewSchema = createInsertSchema(eventViews);

export const selectEventViewCountSchema = createSelectSchema(eventViewCounts);
export const insertEventViewCountSchema = createInsertSchema(eventViewCounts);

// Types
export type EventView = typeof eventViews.$inferSelect;
export type NewEventView = typeof eventViews.$inferInsert;
export type EventViewCount = typeof eventViewCounts.$inferSelect;
export type NewEventViewCount = typeof eventViewCounts.$inferInsert;
