import { getHostPopup } from '@/features/host-center/api/getHostPopup';
import WrapperHostCenter from '@/features/host-center/WrapperHostCenter';
import { getUserSession } from '@/utils/getUserSession';

export default async function Page() {
  const session = await getUserSession();
  const hostPopups = await getHostPopup(session?.user?.id ?? '');

  return <WrapperHostCenter hostPopups={hostPopups} />;
}
