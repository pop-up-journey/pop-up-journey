import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const roleEnum = pgEnum("role", ["admin", "host", "participant"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  role: roleEnum("role").notNull(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  profileImg: text("profile_img"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);

export const createUserSchema = z.object({
  role: z.enum(["admin", "host", "participant"]),
  username: z
    .string()
    .min(2, "사용자명은 최소 2글자 이상")
    .max(50, "사용자명은 최대 50글자"),
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  phone: z
    .string()
    .regex(/^[0-9-+\s()]*$/, "올바른 전화번호 형식이 아닙니다")
    .optional(),
  profileImg: z.string().url("올바른 URL 형식이 아닙니다").optional(),
});

export const updateUserSchema = createUserSchema.partial();

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
