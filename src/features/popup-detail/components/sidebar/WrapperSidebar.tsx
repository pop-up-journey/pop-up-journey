'use client';

import MapContainer from '@/features/popup-detail/components/sidebar/MapContainer';
import OrganizerInfo from '@/features/popup-detail/components/sidebar/OrganizerInfo';
import PopupActionButtons from '@/features/popup-detail/components/sidebar/PopupActionButtons';
import useGeocode from '@/features/popup-detail/hooks/useGeocode';

interface KakaoMapProps {
  address?: string;
  organizer: string;
}
export default function WrapperSidebar({ address, organizer }: KakaoMapProps) {
  const safeAddress = address ?? '';
  const { position } = useGeocode(safeAddress);

  return (
    <main className="mb-10 h-130 w-80">
      {/* 지도 */}
      <MapContainer center={position!} />
      {/* 주최자 */}
      <OrganizerInfo organizer={organizer} />
      {/* 신청 버튼*/}
      {/* TODO: 토스트 알림필요! */}
      <PopupActionButtons />
    </main>
  );
}
