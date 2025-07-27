'use client';

import useKakaoLoader from '@/hooks/useKakaoLoader';
import type { Popup } from '@/types/popup';
import { extractCity } from '@/utils/addressFormatter';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface PopupMapProps {
  events: Popup[];
}
export default function PopupMap({ events }: PopupMapProps) {
  const { isLoaded } = useKakaoLoader();
  const [positions, setPositions] = useState<{ id: string; lat: number; lng: number; title: string }[]>([]);

  useEffect(() => {
    if (!window.kakao?.maps) return;
    const geocoder = new kakao.maps.services.Geocoder();

    events.forEach((event) => {
      const place = extractCity(event?.address);
      geocoder.addressSearch(place, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setPositions((prev) => [
            ...prev,
            { id: event.id, lat: parseFloat(result[0].y), lng: parseFloat(result[0].x), title: event.title },
          ]);
        } else {
          console.warn('좌표 변환 실패:', event.address);
        }
      });
    });
  }, [isLoaded, events]);

  return (
    <div className="my-8 flex justify-center">
      <Map center={{ lat: 37.5665, lng: 126.978 }} level={8} className="h-[500px] w-full rounded-lg shadow">
        {positions.map((pos, idx) => (
          <MapMarker key={`${pos.id}-${idx}`} position={{ lat: pos.lat, lng: pos.lng }} title={pos.title} />
        ))}
      </Map>
    </div>
  );
}
