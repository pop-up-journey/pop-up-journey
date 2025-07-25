import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { eventStatusEnum, participationModeEnum } from './enums';
import { users } from './users';

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  hostId: uuid('host_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  hostName: text('host_name'),
  title: text('title').notNull(),
  thumbnail: text('thumbnail'),
  email: text('email'),
  description: text('description'),
  address: text('address'), // zonecode + address + extraAddress
  capacity: integer('capacity').default(0),
  eventStatus: eventStatusEnum('event_status').notNull(), // 검증 api 로직에서 필요
  participationMode: participationModeEnum('participation_mode').default('auto').notNull(),
  extraInfo: text('extra_info'),
  eventStart: timestamp('event_start').notNull(),
  eventEnd: timestamp('event_end').notNull(),
  externalLink: text('external_link'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * @description 데이터베이스에서 이벤트 정보를 조회할 때 사용되는 스키마
 */
export const selectEventSchema = createSelectSchema(events);

/**
 * @description 데이터베이스에 새로운 이벤트를 생성할 때 사용되는 스키마
 */
export const insertEventSchema = createInsertSchema(events);

/**
 * @description 새로운 이벤트 생성 시 입력 데이터의 유효성을 검증하는 스키마
 * //TODO: 수정 필요함
 */
export const createEventSchema = z.object({
  hostId: z.string().uuid('올바른 UUID 형식이 아닙니다'),
  title: z.string().min(1, '제목은 필수입니다').max(100, '제목은 최대 100글자'),
  thumbnail: z.string().url('올바른 이미지 URL이 아닙니다').optional(),
  email: z.string().email('올바른 이메일 형식이 아닙니다').optional(),
  description: z.string().max(5000, '내용은 최대 5000글자').optional(),
  address: z.string().min(1, '지역은 필수입니다'),
  eventStatus: z.enum(['upcoming', 'ongoing', 'ended']),
  participationMode: z.enum(['auto', 'manual']).default('auto'),
  eventStart: z.date({ required_error: '시작 날짜는 필수입니다' }),
  eventEnd: z.date({ required_error: '종료 날짜는 필수입니다' }),
  capacity: z
    .number({ invalid_type_error: '수용인원은 숫자여야 합니다.' })
    .int('수용인원은 정수여야 합니다.')
    .nonnegative('수용인원은 0이상의 정수여야 합니다.')
    .optional(),
  extraInfo: z.string().optional(),
});

/**
 * @description 이벤트 정보 업데이트 시 입력 데이터의 유효성을 검증하는 스키마
 */
export const updateEventSchema = z.object({
  thumbnail: z.string().url('올바른 이미지 URL이 아닙니다').optional(),
  title: z.string().min(1, '제목은 필수입니다').max(100, '제목은 최대 100글자').optional(),
  description: z.string().max(5000, '내용은 최대 5000글자').optional(),
  address: z.string().min(1, '지역은 필수입니다').optional(),
  eventStatus: z.enum(['upcoming', 'ongoing', 'ended']).optional(),
  participationMode: z.enum(['auto', 'manual']).optional(),
  eventStart: z.date().optional(),
  eventEnd: z.date().optional(),
});

/**
 * @description 이벤트의 시작 날짜와 종료 날짜의 유효성을 검증하는 함수
 * @param data - 검증할 날짜 데이터
 * @throws {Error} 종료 날짜가 시작 날짜보다 이전이거나 같은 경우
 */
export const validateEventDates = (data: { eventStart?: Date; eventEnd?: Date }) => {
  if (data.eventStart && data.eventEnd && data.eventEnd <= data.eventStart) {
    throw new Error('종료 날짜는 시작 날짜보다 늦어야 합니다');
  }
};

// Types
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type CreateEvent = z.infer<typeof createEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
