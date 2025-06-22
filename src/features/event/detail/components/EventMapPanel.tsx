'use client';

import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

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
    <section>
      <div className="h-120 w-100 bg-blue-500">
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
    </section>
  );
}
