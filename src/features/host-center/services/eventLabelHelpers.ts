import { POPUP_STATUS } from '@/types/popup';

export const POPUP_STATUS_LABEL = {
  [POPUP_STATUS.Ongoing]: '진행중',
  [POPUP_STATUS.Ended]: '종료',
  [POPUP_STATUS.Upcoming]: '예정',
};

import { CalendarDaysIcon, CheckCircleIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export const POPUP_STATUS_ICON = {
  [POPUP_STATUS.Ongoing]: CalendarDaysIcon,
  [POPUP_STATUS.Ended]: CheckCircleIcon,
  [POPUP_STATUS.Upcoming]: RocketLaunchIcon,
};
