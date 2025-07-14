import type { Event as DBPopup } from '@/db/schema/events';

export const POPUP_STATUS = {
  Ongoing: 'ongoing',
  Ended: 'ended',
  Upcoming: 'upcoming',
} as const;

export type PopupStatusType = (typeof POPUP_STATUS)[keyof typeof POPUP_STATUS];

export type Popup = DBPopup;
