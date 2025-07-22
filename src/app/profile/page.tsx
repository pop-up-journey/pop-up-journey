import WrapperProfile from '@/features/profile/WrapperProfile';
import HeroSection from '../../components/common/hero-section';
import { clientApi } from '../../libs/api';
import { getUserSession } from '../../services/getUserSession';

export default async function Page() {
  const { userId } = await getUserSession();
  const userInfo = userId ? await clientApi(`/api/users/${userId}`, { method: 'GET' }) : null;

  return (
    <>
      <HeroSection
        title={userInfo ? `${userInfo.name}님 환영합니다!` : '환영합니다!'}
        description="프로필 수정과 관심 팝업은 여기에서 볼 수 있어요"
      />{' '}
      <WrapperProfile />
    </>
  );
}
