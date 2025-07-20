import HeroSection from '@/components/common/hero-section';
import { getHostPopup } from '@/features/host-center/api/getHostPopup';
import HostPopupPanel from '@/features/host-center/components/HostPopupPanel';
import HostProfile from '@/features/host-center/components/HostProfile';
import { getUserSession } from '@/services/getUserSession';

export default async function WrapperHostCenter() {
  console.log('WrapperHostCenter Rendered');
  const session = await getUserSession();
  const hostPopups = await getHostPopup(session?.user?.id ?? '');

  return (
    <main className="mb-10 min-h-screen">
      <HeroSection title="팝업의 여정 호스트 센터" description="이벤트를 주최하고 관리할 수 있습니다." />
      <HostProfile />
      <HostPopupPanel hostPopups={hostPopups} />
    </main>
  );
}
