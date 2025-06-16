// mock/upcomingPopupList.ts
export interface PopupItem {
  id: number;
  title: string;
  region: string;
  date: string;
  thumbnail: string;
  tags: string[];
  organizer: string;
}

export const upcomingPopupList: PopupItem[] = [
  {
    id: 1,
    title: '무인양품 팝업',
    region: '서울 성수',
    date: '6.1 ~ 6.15',
    thumbnail: 'https://heroui.com/images/card-example-4.jpeg',
    tags: ['라이프스타일', '패브릭'],
    organizer: '무인양품코리아',
  },
  {
    id: 2,
    title: '마르디 메크르디',
    region: '부산 해운대',
    date: '6.10 ~ 6.20',
    thumbnail: 'https://heroui.com/images/card-example-3.jpeg',
    tags: ['패션', 'MZ'],
    organizer: '마르디팀',
  },
  {
    id: 3,
    title: 'W컨셉',
    region: '서울 강남',
    date: '6.5 ~ 6.25',
    thumbnail: 'https://heroui.com/images/card-example-2.jpeg',
    tags: ['패션', '온라인'],
    organizer: 'W컨셉 브랜드팀',
  },
];
