export const EVENT_STATUS = {
  Ongoing: 'ongoing',
  Ended: 'ended',
  Upcoming: 'upcoming',
} as const;

export type EventStatusType = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS];

export interface EventData {
  id: number;
  title: string;
  thumbnail: string;
  tags: string[];
  eventStart: string;
  eventEnd: string;
  address: string;
  description?: string;
  hostId: string;
  saveCount: number;
  eventStatus: EventStatusType;
}
