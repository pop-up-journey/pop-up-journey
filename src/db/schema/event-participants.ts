import { integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { participantStatusEnum } from './enums';
import { events } from './events';
import { users } from './users';

export const eventParticipants = pgTable('event_participants', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id, { onDelete: 'cascade' }),
  participantStatus: participantStatusEnum('participant_status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  tickets: integer('tickets').notNull().default(1),
});

/**
 * @description 데이터베이스에서 이벤트 참가자 정보를 조회할 때 사용되는 스키마
 */
export const selectEventParticipantSchema = createSelectSchema(eventParticipants);

/**
 * @description 데이터베이스에 새로운 이벤트 참가자를 생성할 때 사용되는 스키마
 */
export const insertEventParticipantSchema = createInsertSchema(eventParticipants);

/**
 * @description 새로운 이벤트 참가자 생성 시 입력 데이터의 유효성을 검증하는 스키마
 */
export const createEventParticipantSchema = z.object({
  userId: z.string().uuid('올바른 UUID 형식이 아닙니다'),
  eventId: z.string().uuid('올바른 UUID 형식이 아닙니다'),
  participantStatus: z.enum(['pending', 'approved', 'rejected', 'cancelled']).default('pending'), // TODO: default approve인듯
  tickets: z.number().int('티켓 수량은 정수여야 합니다').min(1, '최소 1장 이상 신청해야 합니다').default(1),
});

/**
 * @description 이벤트 참가자 상태 업데이트 시 입력 데이터의 유효성을 검증하는 스키마
 */
export const updateParticipantStatusSchema = z.object({
  participantStatus: z.enum(['pending', 'approved', 'rejected', 'cancelled']),
});

export type EventParticipant = typeof eventParticipants.$inferSelect;
export type NewEventParticipant = typeof eventParticipants.$inferInsert;
export type CreateEventParticipant = z.infer<typeof createEventParticipantSchema>;
export type UpdateParticipantStatus = z.infer<typeof updateParticipantStatusSchema>;
