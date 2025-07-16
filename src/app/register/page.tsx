import WrapperPopupRegister from '@/features/popup-register/WrapperPopupRegister';
import { getUserSession } from '@/utils/getUserSession';
import { redirect } from 'next/navigation';
export default async function Page() {
  const session = await getUserSession();

  // TODO: 이거 미들웨어에서 처리 하면좋을 듯
  if (!session) {
    return redirect('/');
  }
  return <WrapperPopupRegister session={session} />;
}
