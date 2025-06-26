export const regionGroups: Record<string, string[]> = {
  서울: ['서울'],
  수도권: ['경기', '인천'],
  강원권: ['강원'],
  충청권: ['충북', '충남', '세종', '대전'],
  전라권: ['전북', '전남', '광주'],
  경상권: ['경북', '경남', '대구', '부산', '울산'],
  제주권: ['제주'],
};

// 권역 키 리스트 타입
export type Zone = keyof typeof regionGroups;

// 권역 배열 생성
export const zones: Zone[] = Object.keys(regionGroups) as Zone[];
