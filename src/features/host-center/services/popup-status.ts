export const POPUP_STATUS = {
  Ongoing: 'ongoing',
  Ended: 'ended',
  Upcoming: 'upcoming',
} as const;

export const POPUP_STATUS_MSG = {
  [POPUP_STATUS.Ongoing]: '주최된 팝업이 없습니다.',
  [POPUP_STATUS.Ended]: '종료된 팝업이 없습니다.',
  [POPUP_STATUS.Upcoming]: '예정된 팝업이 없습니다.',
} as const;

export const POPUP_STATUS_LABEL = {
  [POPUP_STATUS.Ongoing]: '진행중',
  [POPUP_STATUS.Ended]: '종료',
  [POPUP_STATUS.Upcoming]: '예정',
};

export type PopupStatusType = (typeof POPUP_STATUS)[keyof typeof POPUP_STATUS];
