import { pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'host', 'participant']);

export const eventStatusEnum = pgEnum('event_status', ['upcoming', 'ongoing', 'ended']);

export const participationModeEnum = pgEnum('participation_mode', ['auto', 'manual']);

export const participantStatusEnum = pgEnum('participant_status', ['pending', 'approved', 'rejected', 'cancelled']);
