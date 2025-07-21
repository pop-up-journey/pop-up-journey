import WrapperHostCenter from '@/features/host-center/WrapperHostCenter';
import { getHostPopup } from '@/features/host-center/api/getHostPopup';
import { getUserSession } from '@/services/getUserSession';

export default async function Page() {
  const { userId } = await getUserSession();
  const hostPopups = await getHostPopup(userId ?? '');

  return <WrapperHostCenter hostPopups={hostPopups} />;
}
