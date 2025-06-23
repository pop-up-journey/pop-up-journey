import { StaticImageData } from 'next/image';
import mockThumb01 from './thumbnails/mock01.webp';
export interface PopupItem {
  id: number;
  title: string;
  region: string;
  event_start: string;
  event_end: string;
  thumbnail: string | StaticImageData;
  tags: string[];
  organizer: string;
}

export const upcomingPopupList: PopupItem[] = [
  {
    id: 1,
    title: '무인양품 팝업',
    region: '서울특별시 성동구 성수동',
    event_start: '2025.06.01',
    event_end: '2025.06.15',
    thumbnail: mockThumb01,
    tags: ['라이프스타일', '패브릭'],
    organizer: '무인양품코리아',
  },
  {
    id: 2,
    title: '마르디 메크르디',
    region: '부산 해운대',
    event_start: '2025.06.05',
    event_end: '2025.06.25',
    thumbnail: 'https://heroui.com/images/card-example-3.jpeg',
    tags: ['패션', 'MZ'],
    organizer: '마르디팀',
  },
  {
    id: 3,
    title: 'W컨셉',
    region: '서울 강남',
    event_start: '2025.06.10',
    event_end: '2025.06.20',
    thumbnail: 'https://heroui.com/images/card-example-2.jpeg',
    tags: ['패션', '온라인'],
    organizer: 'W컨셉 브랜드팀',
  },
  {
    id: 4,
    title: '아르켓 친환경 마켓',
    region: '서울 한남',
    event_start: '2025.06.15',
    event_end: '2025.06.30',
    thumbnail: 'https://heroui.com/images/card-example-2.jpeg',
    tags: ['지속가능', '마켓'],
    organizer: '아르켓코리아',
  },
  {
    id: 5,
    title: '오롤리데이 감성 문구전',
    region: '부산 해운대',
    event_start: '2025.06.20',
    event_end: '2025.07.05',
    thumbnail: 'https://heroui.com/images/card-example-3.jpeg',
    tags: ['문구', '디자인'],
    organizer: '오롤리데이',
  },
  {
    id: 6,
    title: '마르디 메크르디 아카이브',
    region: '서울 압구정',
    event_start: '2025.06.25',
    event_end: '2025.07.10',
    thumbnail: 'https://heroui.com/images/card-example-1.jpeg',
    tags: ['패션', '컬래버레이션'],
    organizer: '마르디 메크르디',
  },
];
