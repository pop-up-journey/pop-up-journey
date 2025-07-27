import WrapperPopupRegister from '@/features/popup-register/WrapperPopupRegister';
import { getUserSession } from '@/services/getUserSession';
import { redirect } from 'next/navigation';
export default async function Page() {
  const { session } = await getUserSession();

  if (!session) {
    return redirect('/');
  }
  return <WrapperPopupRegister session={session} />;
}
