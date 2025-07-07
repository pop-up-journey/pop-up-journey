import { EVENT_STATUS } from '@/types/event';

export const EVENT_STATUS_LABEL = {
  [EVENT_STATUS.Ongoing]: '진행중',
  [EVENT_STATUS.Ended]: '종료',
  [EVENT_STATUS.Upcoming]: '예정',
};

export const EVENT_STATUS_ICON = {
  [EVENT_STATUS.Ongoing]: '📅',
  [EVENT_STATUS.Ended]: '🎉',
  [EVENT_STATUS.Upcoming]: '🚀',
};
