'use client';

import HeroSection from '@/components/common/hero-section';
import { Divider } from '@heroui/react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-haiku';
import Button from '../components/common/button';
import CardComponent from '../components/common/card';
import { clientApi } from '../libs/api';
import { upcomingPopupList } from '../mock/mockdata';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [favorites, setFavorites] = useLocalStorage<number[]>('favoritePopups', []);
  const router = useRouter();
  const getUserInfo = async () => {
    try {
      if (status === 'authenticated' && session?.user?.id) {
        const res = await clientApi(`/api/users/${session?.user?.id}`, { method: 'GET' });
        console.log(res);
        setUserInfo(res);
      }
    } catch (error) {
      console.error('Failed to get user info', error);
    }
  };

  // TODO: 알림 -> 토스트로 변경
  const deleteUser = async () => {
    if (!confirm('정말 탈퇴하시겠습니까?')) return;

    try {
      if (status === 'authenticated' && session?.user?.id) {
        await clientApi(`/api/users/${session.user.id}`, { method: 'DELETE' });
        alert('회원 탈퇴가 완료되었습니다.');
        // 세션 종료 및 홈으로 리다이렉트
        await signOut({ callbackUrl: '/' });
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [session, status]);

  return (
    <main className="min-h-screen">
      <HeroSection
        title={`${userInfo && userInfo[0]?.name}님 환영합니다!`}
        description="프로필 수정과 관심 팝업은 여기에서 볼 수 있어요"
      />
      {/* 프로필 */}
      <section id="defaultSt" className="mx-auto mt-8 flex max-w-5xl items-center justify-between border-b pb-8">
        <div className="flex items-center gap-6">
          {userInfo && userInfo[0]?.image && (
            <Image src={userInfo[0]?.image} alt="profile" width={80} height={80} className="rounded-full" />
          )}
          <div className="flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{userInfo && userInfo[0]?.name}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded px-2 py-1 font-mono text-xs">{userInfo && userInfo[0]?.email}</span>
              <span className="rounded px-2 py-1 font-mono text-xs">{userInfo && userInfo[0]?.phone}</span>
            </div>
          </div>
        </div>

        {/* 프로필수정 */}
        <div className="flex gap-3">
          <Button onPress={() => router.push('/add-info')}>프로필 수정</Button>
          <Button onPress={() => signOut()}>로그아웃</Button>
        </div>
      </section>
      {/* 관심팝업 */}
      {/* TODO: 페이지네이션 어떻게 할지 추가적인 설정 필요 */}
      <section className="mx-auto mt-12 max-w-5xl">
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
      {/* 회원탈퇴 */}
      <section className="mx-auto mt-12 mb-10 max-w-5xl pb-10">
        <Divider className="my-4" />
        <p onClick={deleteUser} className="cursor-pointer text-end text-gray-500 hover:underline">
          회원을 탈퇴하고 싶으신가요?
        </p>
      </section>
    </main>
  );
}
