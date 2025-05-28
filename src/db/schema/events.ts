import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./users";

// Event Status Enum
export const eventStatusEnum = pgEnum("event_status", [
  "upcoming",
  "ongoing",
  "ended",
]);

// Participation Mode Enum
export const participationModeEnum = pgEnum("participation_mode", [
  "auto",
  "manual",
]);

// Events Table
export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  hostId: uuid("host_id")
    .notNull()
    .references(() => users.id),
  thumbnail: text("thumbnail"),
  title: text("title").notNull(),
  body: text("body"),
  region: text("region"),
  saveCount: integer("save_count").default(0).notNull(),
  eventStatus: eventStatusEnum("event_status").notNull(),
  participationMode: participationModeEnum("participation_mode")
    .default("auto")
    .notNull(),
  eventStart: timestamp("event_start").notNull(),
  eventEnd: timestamp("event_end").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Zod Schemas
export const selectEventSchema = createSelectSchema(events);
export const insertEventSchema = createInsertSchema(events);

// Custom Validation Schemas
export const createEventSchema = z.object({
  hostId: z.string().uuid("올바른 UUID 형식이 아닙니다"),
  thumbnail: z.string().url("올바른 이미지 URL이 아닙니다").optional(),
  title: z.string().min(1, "제목은 필수입니다").max(100, "제목은 최대 100글자"),
  body: z.string().max(5000, "내용은 최대 5000글자").optional(),
  region: z.string().min(1, "지역은 필수입니다"),
  eventStatus: z.enum(["upcoming", "ongoing", "ended"]),
  participationMode: z.enum(["auto", "manual"]).default("auto"),
  eventStart: z.date({ required_error: "시작 날짜는 필수입니다" }),
  eventEnd: z.date({ required_error: "종료 날짜는 필수입니다" }),
});

export const updateEventSchema = z.object({
  thumbnail: z.string().url("올바른 이미지 URL이 아닙니다").optional(),
  title: z
    .string()
    .min(1, "제목은 필수입니다")
    .max(100, "제목은 최대 100글자")
    .optional(),
  body: z.string().max(5000, "내용은 최대 5000글자").optional(),
  region: z.string().min(1, "지역은 필수입니다").optional(),
  eventStatus: z.enum(["upcoming", "ongoing", "ended"]).optional(),
  participationMode: z.enum(["auto", "manual"]).optional(),
  eventStart: z.date().optional(),
  eventEnd: z.date().optional(),
});

// Validation for date logic
export const validateEventDates = (data: {
  eventStart?: Date;
  eventEnd?: Date;
}) => {
  if (data.eventStart && data.eventEnd && data.eventEnd <= data.eventStart) {
    throw new Error("종료 날짜는 시작 날짜보다 늦어야 합니다");
  }
};

// Types
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type CreateEvent = z.infer<typeof createEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
