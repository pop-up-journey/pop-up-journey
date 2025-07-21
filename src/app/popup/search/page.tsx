import WrapperPopupSearch from '@/features/popup-search/WrapperPopupSearch';
import { GetPopupsParams, getPopups } from '@/services/getPopups';

interface PageProps {
  searchParams: Promise<{ zone?: string; tags?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { zone, tags } = await searchParams;
  const selectedTags = tags ? [tags.split(',')[0]] : [];

  // 초기접속시 보여줄 이벤트 목록
  const { events, totalCount } = await getPopups({
    zone: zone ?? null,
    tags: selectedTags,
  } as GetPopupsParams);

  // 전체 이벤트(전체 조회, 맵에 표시하기 위함)
  const { events: fullEvents } = await getPopups({
    zone: zone ?? null,
    tags: selectedTags,

    pageSize: totalCount,
  } as GetPopupsParams);

  return (
    <WrapperPopupSearch
      selectedZone={zone ?? null}
      selectedTags={selectedTags}
      initialItems={events}
      initialTotalCount={totalCount}
      fullEvents={fullEvents}
    />
  );
}
