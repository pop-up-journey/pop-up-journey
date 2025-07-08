'use client';

import HeroSection from '@/components/common/hero-section';
import useGetUserInfo from '@/hooks/useGetUserInfo';

import MembershipWithdrawal from '@/features/profile/components/MembershipWithdrawal';
import MyProfile from '@/features/profile/components/MyProfile';
import { useLocalStorage } from 'react-haiku';
import Button from '../components/common/button';
import CardComponent from '../components/common/card';
import { upcomingPopupList } from '../mock/mockdata';

export default function ProfilePage() {
  const { userInfo } = useGetUserInfo();
  const [favorites, setFavorites] = useLocalStorage<number[]>('favoritePopups', []);

  if (!userInfo) return <div>Loading...</div>;

  // TODO: 알림 -> 토스트로 변경
  // 모달창으로 한번 더 confirm 창 띄우기
  // save event api
  {
    /* TODO: 페이지네이션 어떻게 할지 추가적인 설정 필요 */
  }

  return (
    <main className="min-h-screen">
      <HeroSection
        title={`${userInfo && userInfo.name}님 환영합니다!`}
        description="프로필 수정과 관심 팝업은 여기에서 볼 수 있어요"
      />
      {/** TODO: 섹션 분리해야됨 mainpage 작업 이후에 진행할 예정*/}
      <div className="mx-auto max-w-6xl">
        <MyProfile userInfo={userInfo} />
        {/* 관심팝업 */}
        <section className="mx-auto mt-12">
          <h2 className="mb-4 text-2xl font-bold">나의 관심 팝업</h2>
          {/* 관심 팝업 전체 삭제 버튼 : 관심팝업이 1개 이상일 경우*/}
          {favorites.length > 0 && (
            <div className="mb-4 text-right">
              <Button
                size="sm"
                onPress={() => {
                  if (confirm('관심 팝업을 전부 삭제하시겠습니까?')) {
                    setFavorites([]);
                  }
                }}
              >
                전체 삭제
              </Button>
            </div>
          )}
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            {upcomingPopupList
              .filter((p) => favorites.includes(p.id))
              .map((p) => (
                <CardComponent
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  thumbnail={p.thumbnail}
                  tags={p.tags}
                  eventStart={p.event_start}
                  eventEnd={p.event_end}
                  variant="compact"
                  isFavorite={true}
                />
              ))}
          </div>
          {favorites.length === 0 && <p className="col-span-3 text-center text-gray-500">아직 관심 팝업이 없습니다.</p>}
        </section>
        <MembershipWithdrawal userInfo={userInfo} />
      </div>
    </main>
  );
}
