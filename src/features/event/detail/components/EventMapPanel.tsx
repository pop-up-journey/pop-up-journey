'use client';

import useKakaoLoader from '@/hooks/useKakaoLoader';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { Avatar } from '@heroui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Button from '../../../../components/common/button';
import ShareButton from './ShareButton';

interface KakaoMapProps {
  address: string;
  organizer: string;
}
// 맵 로드
export default function EventMapPanel({ address, organizer }: KakaoMapProps) {
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
      {/* 지도 */}
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
      {/* 주최자 */}
      {/* NOTE: 우선은 host-center로 연결해놨는데 주최자가 운영하고 있는/종료/예정인 팝업을 보여주는 페이지가 더 필요하지 않을까 싶음 */}
      <div className="mt-4 flex flex-col gap-2">
        <Link className="mb-2 flex flex-row items-center gap-2" href={`/host-center`}>
          <Avatar src={undefined} showFallback as="button" className="h-7 w-7 cursor-pointer" color="danger" />
          <h4 className="text-lg font-semibold text-gray-500">{organizer}</h4>
          <ChevronDoubleRightIcon className="h-5 w-5 text-gray-500" />
        </Link>
        {/* 신청 버튼*/}
        <Link href="/event/participate">
          <Button fullWidth>신청하기</Button>
        </Link>
        {/* 관심 행사 등록*/}
        {/* NOTE: 토스트로 '관심행사로 등록되었습니다 띄워주기' */}
        <div className="flex flex-row items-center gap-6">
          <Button fullWidth>관심 행사</Button>
          <ShareButton />
        </div>
      </div>
    </section>
  );
}
