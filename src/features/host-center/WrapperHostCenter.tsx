'use client';

import HeroSection from '@/components/common/hero-section';
import HostPopupPanel from '@/features/host-center/components/HostPopupPanel';
import HostProfile from '@/features/host-center/components/HostProfile';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { type EventData } from '@/types/event';

interface WrapperHostCenterProps {
  hostEvents: EventData[];
}

export default function WrapperHostCenter({ hostEvents }: WrapperHostCenterProps) {
  const { userInfo } = useGetUserInfo();

  return (
    <main className="min-h-screen">
      <HeroSection title="팝업의 여정 호스트 센터" description="이벤트를 주최하고 관리할 수 있습니다." />
      <HostProfile userInfo={userInfo} />
      <HostPopupPanel hostEvents={hostEvents} />
    </main>
  );
}
