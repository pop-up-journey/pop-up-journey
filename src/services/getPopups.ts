import { PAGE_SIZE_EIGHT } from '@/configs/pageSize';
import { clientApi } from '@/libs/api';
import type { PopupWithTags } from '@/types/popup';

export interface PopupsResponse {
  events: PopupWithTags[];
  totalCount: number;
}

export interface GetPopupsParams {
  status?: string;
  zone?: string | null;
  tags?: string[];
  page?: number;
  pageSize?: number;
}

export async function getPopups({
  status,
  zone,
  tags,
  page = 1,
  pageSize = PAGE_SIZE_EIGHT,
}: GetPopupsParams): Promise<PopupsResponse> {
  // 쿼리 문자열 조립
  const qs = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...(status ? { status } : {}),
    ...(zone ? { zone } : {}),
    ...(tags && tags.length > 0 ? { tags: tags.join(',') } : {}),
  }).toString();

  try {
    // clientApi 호출
    const res = await clientApi(`/api/events?${qs}`, { method: 'GET' });
    return res as PopupsResponse;
  } catch (error) {
    console.error('Failed to fetch events', error);
    // 에러 시 기본값 리턴
    return { events: [], totalCount: 0 };
  }
}
