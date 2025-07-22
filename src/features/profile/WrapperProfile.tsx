'use client';

import useGetUserInfo from '@/hooks/useGetUserInfo';

import MembershipWithdrawal from '@/features/profile/components/MembershipWithdrawal';
import MyProfile from '@/features/profile/components/MyProfile';
import MyParticipatedPopupList from './components/MyParticipatedPopupList';
import MySavedPopupList from './components/MySavedPopupList';

export default function WrapperProfile() {
  const { userInfo } = useGetUserInfo();

  if (!userInfo) return <div>Loading...</div>;

  // TODO: 알림 -> 토스트로 변경
  // 모달창으로 한번 더 confirm 창 띄우기
  // save event api
  {
    /* TODO: 페이지네이션 어떻게 할지 추가적인 설정 필요 */
  }

  return (
    <main className="min-h-screen">
      {/** TODO: 섹션 분리해야됨 mainpage 작업 이후에 진행할 예정*/}
      <div className="mx-auto max-w-6xl">
        <MyProfile userInfo={userInfo} />
        {/* TODO: 내가 신청한 팝업 CRUD */}
        <MyParticipatedPopupList userId={userInfo.id} />
        {/* 관심팝업 */}
        <MySavedPopupList userId={userInfo.id} />
        <MembershipWithdrawal userInfo={userInfo} />
      </div>
    </main>
  );
}
