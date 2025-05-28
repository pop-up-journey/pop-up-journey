import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./users";
import { events } from "./events";

// Event Save Table (관심목록)
export const eventSave = pgTable("event_save", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Zod Schemas
export const selectEventSaveSchema = createSelectSchema(eventSave);
export const insertEventSaveSchema = createInsertSchema(eventSave);

// Custom Validation Schemas
export const createEventSaveSchema = z.object({
  userId: z.string().uuid("올바른 UUID 형식이 아닙니다"),
  eventId: z.string().uuid("올바른 UUID 형식이 아닙니다"),
});

// Types
export type EventSave = typeof eventSave.$inferSelect;
export type NewEventSave = typeof eventSave.$inferInsert;
export type CreateEventSave = z.infer<typeof createEventSaveSchema>;
