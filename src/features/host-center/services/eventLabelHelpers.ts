import { EVENT_STATUS } from '@/types/event';

export const EVENT_STATUS_LABEL = {
  [EVENT_STATUS.Ongoing]: '진행중',
  [EVENT_STATUS.Ended]: '종료',
  [EVENT_STATUS.Upcoming]: '예정',
};

import { CalendarDaysIcon, CheckCircleIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export const EVENT_STATUS_ICON = {
  [EVENT_STATUS.Ongoing]: CalendarDaysIcon,
  [EVENT_STATUS.Ended]: CheckCircleIcon,
  [EVENT_STATUS.Upcoming]: RocketLaunchIcon,
};
