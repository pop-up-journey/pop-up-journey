'use client';

import EventActionButtons from '@/features/popup-detail/components/EventActionButtons';
import MapContainer from '@/features/popup-detail/components/MapContainer';
import OrganizerInfo from '@/features/popup-detail/components/OrganizerInfo';
import useGeocode from '@/features/popup-detail/hooks/useGeocode';

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
      <OrganizerInfo organizer={organizer} />
      {/* 신청 버튼*/}
      {/* TODO: 토스트 알림필요! */}
      <EventActionButtons />
    </main>
  );
}
