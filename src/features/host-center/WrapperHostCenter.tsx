'use client';

import HeroSection from '@/components/common/hero-section';
import HostPopupPanel from '@/features/host-center/components/HostPopupPanel';
import HostProfile from '@/features/host-center/components/HostProfile';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import type { Popup } from '@/types/popup';

interface WrapperHostCenterProps {
  hostEvents: Popup[];
}

export default function WrapperHostCenter({ hostEvents }: WrapperHostCenterProps) {
  const { userInfo } = useGetUserInfo();
  console.log(hostEvents);

  return (
    <main className="min-h-screen">
      <HeroSection title="팝업의 여정 호스트 센터" description="이벤트를 주최하고 관리할 수 있습니다." />
      <HostProfile userInfo={userInfo} />
      <HostPopupPanel hostEvents={hostEvents} />
    </main>
  );
}
