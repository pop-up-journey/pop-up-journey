'use client';

import EventActionButtons from '@/features/event/detail/components/EventActionButtons';
import MapContainer from '@/features/event/detail/components/MapContainer';
import OrganizerInfo from '@/features/event/detail/components/OrganizerInfo';
import useGeocode from '@/features/event/detail/hooks/useGeocode';

interface KakaoMapProps {
  address?: string;
  organizer: string;
}
export default function EventMapPanel({ address, organizer }: KakaoMapProps) {
  const safeAddress = address ?? '';
  const { position } = useGeocode(safeAddress);

  return (
    <main className="h-130 w-80">
      {/* 지도 */}
      <MapContainer center={position!} />
      {/* 주최자 */}
      {/* NOTE: 우선은 host-center로 연결해놨는데 주최자가 운영하고 있는/종료/예정인 팝업을 보여주는 페이지가 더 필요하지 않을까 싶음 */}
      <OrganizerInfo organizer={organizer} />
      {/* 신청 버튼*/}
      {/* TODO: 토스트 알림필요! */}
      <EventActionButtons />
    </main>
  );
}
