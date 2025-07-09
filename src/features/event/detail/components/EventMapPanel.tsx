'use client';

import Button from '@/components/common/button';
import MapContainer from '@/features/event/detail/components/MapContainer';
import OrganizerInfo from '@/features/event/detail/components/OrganizerInfo';
import ShareButton from '@/features/event/detail/components/ShareButton';
import useGeocode from '@/features/event/detail/hooks/useGeocode';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface KakaoMapProps {
  address?: string;
  organizer: string;
}
export default function EventMapPanel({ address, organizer }: KakaoMapProps) {
  const { eventId } = useParams();
  const safeAddress = address ?? '';
  const { position } = useGeocode(safeAddress);

  return (
    <main className="h-130 w-80">
      {/* 지도 */}
      <MapContainer center={position!} />
      {/* 주최자 */}
      {/* NOTE: 우선은 host-center로 연결해놨는데 주최자가 운영하고 있는/종료/예정인 팝업을 보여주는 페이지가 더 필요하지 않을까 싶음 */}
      <div className="mt-4 flex flex-col gap-2">
        <OrganizerInfo organizer={organizer} />
        {/* 신청 버튼*/}
        <Link href={`/event/${eventId}/participate`}>
          <Button fullWidth>신청하기</Button>
        </Link>
        {/* 관심 행사 등록*/}
        {/* NOTE: 토스트로 '관심행사로 등록되었습니다 띄워주기' */}
        <div className="flex flex-row items-center gap-6">
          <Button fullWidth>관심 행사</Button>
          <ShareButton />
        </div>
      </div>
    </main>
  );
}
