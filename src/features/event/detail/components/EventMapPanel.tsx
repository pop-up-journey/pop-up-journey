'use client';

import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Button from '../../../../components/common/button';

interface KakaoMapProps {
  address: string;
}

export default function EventMapPanel({ address }: KakaoMapProps) {
  const { isLoaded } = useKakaoLoader();
  const [position, setPosition] = useState({ lat: 33.167, lng: 126.570667 });

  useEffect(() => {
    if (!window.kakao?.maps) return;
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPosition({
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
        });
      }
    });
  }, [isLoaded, address]);

  return (
    <section className="h-130 w-80">
      <div className="mb-6 w-full max-w-4xl transform overflow-hidden rounded-2xl shadow-2xl transition-transform hover:-translate-y-2">
        <Map
          id="map"
          center={position}
          style={{
            width: '100%',
            height: '400px',
          }}
          level={3}
        >
          <MapMarker position={position} />
        </Map>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Button fullWidth>신청하기</Button>
        <div className="flex flex-row items-center gap-6">
          <Button fullWidth>관심 행사</Button>
          <Button fullWidth>공유하기</Button>
        </div>
      </div>
    </section>
  );
}
