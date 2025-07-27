'use client';

import HeroSection from '@/components/common/hero-section';
import useGetUserInfo from '@/hooks/useGetUserInfo';

import MembershipWithdrawal from '@/features/profile/components/MembershipWithdrawal';
import MyProfile from '@/features/profile/components/MyProfile';
import MyParticipatedPopupList from './components/MyParticipatedPopupList';
import MySavedPopupList from './components/MySavedPopupList';

export default function WrapperProfile() {
  const { userInfo } = useGetUserInfo();

  if (!userInfo) return <div>Loading...</div>;

  return (
    <main className="min-h-screen">
      <HeroSection
        title={`${userInfo && userInfo.name}님 환영합니다!`}
        description="프로필 수정과 관심 팝업은 여기에서 볼 수 있어요"
      />
      <div className="mx-auto max-w-6xl">
        <MyProfile userInfo={userInfo} />
        {/* 내가 신청한 팝업 */}
        <MyParticipatedPopupList userId={userInfo.id} />
        {/* 관심팝업 */}
        <MySavedPopupList userId={userInfo.id} />
        <MembershipWithdrawal userInfo={userInfo} />
      </div>
    </main>
  );
}
