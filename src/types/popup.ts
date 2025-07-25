import type { Event as DBPopup } from '@/db/schema/events';

export type Popup = DBPopup;

export interface PopupWithTags extends Popup {
  tags: string[];
}
