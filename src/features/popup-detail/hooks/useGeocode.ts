'use client';

import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useEffect, useState } from 'react';

export interface LatLng {
  lat: number;
  lng: number;
}

export default function useGeocode(address: string) {
  //HACK: 주소를 못 읽어오는 경우 띄워주는 기본좌표를 서울 중심으로 했는데 길찾기로 띄워줄까?
  const [position, setPosition] = useState<LatLng | null>({ lat: 37.5642135, lng: 127.0016985 });
  const { isLoaded } = useKakaoLoader();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!window.kakao?.maps) {
      setError(new Error('Kakao Map SDK not loaded'));
      return;
    }
    if (!address) {
      setError(new Error('No address provided'));
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPosition({
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
        });
      } else {
        setError(new Error('Failed to geocode address'));
      }
    });
  }, [isLoaded, address]);
  return { position, isLoaded, error };
}
