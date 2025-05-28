import { pgTable, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./users";
import { events } from "./events";

// Participant Status Enum
export const participantStatusEnum = pgEnum("participant_status", [
  "pending",
  "approved",
  "rejected",
  "cancelled",
]);

// Event Participants Table
export const eventParticipants = pgTable("event_participants", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id),
  participantStatus: participantStatusEnum("participant_status")
    .default("pending")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Zod Schemas
export const selectEventParticipantSchema =
  createSelectSchema(eventParticipants);
export const insertEventParticipantSchema =
  createInsertSchema(eventParticipants);

// Custom Validation Schemas
export const createEventParticipantSchema = z.object({
  userId: z.string().uuid("올바른 UUID 형식이 아닙니다"),
  eventId: z.string().uuid("올바른 UUID 형식이 아닙니다"),
  participantStatus: z
    .enum(["pending", "approved", "rejected", "cancelled"])
    .default("pending"),
});

export const updateParticipantStatusSchema = z.object({
  participantStatus: z.enum(["pending", "approved", "rejected", "cancelled"]),
});

// Types
export type EventParticipant = typeof eventParticipants.$inferSelect;
export type NewEventParticipant = typeof eventParticipants.$inferInsert;
export type CreateEventParticipant = z.infer<
  typeof createEventParticipantSchema
>;
export type UpdateParticipantStatus = z.infer<
  typeof updateParticipantStatusSchema
>;
