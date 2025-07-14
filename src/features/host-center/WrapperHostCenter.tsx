'use client';

import HeroSection from '@/components/common/hero-section';
import HostPopupPanel from '@/features/host-center/components/HostPopupPanel';
import HostProfile from '@/features/host-center/components/HostProfile';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import type { Popup } from '@/types/popup';

interface WrapperHostCenterProps {
  hostPopups: Popup[];
}

export default function WrapperHostCenter({ hostPopups }: WrapperHostCenterProps) {
  const { userInfo } = useGetUserInfo();
  // TODO: 렌더링 최적화 필요
  // console.log(hostPopups);

  return (
    <main className="min-h-screen">
      <HeroSection title="팝업의 여정 호스트 센터" description="이벤트를 주최하고 관리할 수 있습니다." />
      <HostProfile userInfo={userInfo} />
      <HostPopupPanel hostPopups={hostPopups} />
    </main>
  );
}
