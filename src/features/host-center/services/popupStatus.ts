export const POPUP_STATUS = {
  Ongoing: 'ongoing',
  Ended: 'ended',
  Upcoming: 'upcoming',
} as const;

export const POPUP_STATUS_INFO = {
  [POPUP_STATUS.Ongoing]: {
    status: 'ongoing',
    message: '진행중인 팝업이 없습니다.',
    label: '진행중인 팝업',
  },
  [POPUP_STATUS.Ended]: {
    status: 'ended',
    message: '종료된 팝업이 없습니다.',
    label: '종료된 팝업',
  },
  [POPUP_STATUS.Upcoming]: {
    status: 'upcoming',
    message: '예정된 팝업이 없습니다.',
    label: '예정된 팝업',
  },
};

export type PopupStatusType = (typeof POPUP_STATUS)[keyof typeof POPUP_STATUS];
