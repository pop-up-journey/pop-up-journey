'use client';

import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface Event {
  id: number;
  address: string;
  title: string;
}

interface Props {
  events: Event[];
}
// NOTE: 선택한 지역 권역에 따라 중심좌표를 이동하게 할까
export default function EventsMap({ events }: Props) {
  const { isLoaded } = useKakaoLoader();
  const [positions, setPositions] = useState<{ lat: number; lng: number; title: string }[]>([]);

  useEffect(() => {
    if (!window.kakao?.maps) return;
    const geocoder = new kakao.maps.services.Geocoder();

    events.forEach((event) => {
      const place = event.address.split(',').map((s: string) => s.trim())[1];

      geocoder.addressSearch(place, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setPositions((prev) => [
            ...prev,
            {
              lat: parseFloat(result[0].y),
              lng: parseFloat(result[0].x),
              title: event.title,
            },
          ]);
        } else {
          console.warn('좌표 변환 실패:', event.address);
        }
      });
    });
  }, [isLoaded, events]);

  return (
    <div className="my-8 flex justify-center">
      <Map
        center={{ lat: 37.5665, lng: 126.978 }} // 기본 서울 중심좌표(성수로 해놔도 괜찮을 듯)
        level={8}
        className="h-[500px] w-full rounded-lg shadow"
      >
        {positions.map((pos, idx) => (
          <MapMarker key={idx} position={{ lat: pos.lat, lng: pos.lng }} title={pos.title} />
        ))}
      </Map>
    </div>
  );
}
