import type { Event as DBEvent } from '@/db/schema/events';

export const EVENT_STATUS = {
  Ongoing: 'ongoing',
  Ended: 'ended',
  Upcoming: 'upcoming',
} as const;

export type EventStatusType = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS];

export type EventData = DBEvent;
