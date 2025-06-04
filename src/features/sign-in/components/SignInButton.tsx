import Google from '@/assets/logos/google.svg';
import Kakao from '@/assets/logos/kakao.svg';
import Naver from '@/assets/logos/naver.svg';
import Image from 'next/image';
import { signInAction } from '../services/signInAction';

interface SignInButtonProps {
  provider: 'google' | 'naver' | 'kakao';
  logo: string;
}

export function SignInButton({ provider, logo }: SignInButtonProps) {
  // 소셜별 색상
  const bgColor = {
    google: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-200',
    naver: 'bg-[#03C75A] text-white hover:bg-[#02b152]',
    kakao: 'bg-[#FEE500] text-[#3C1E1E] hover:bg-yellow-300',
  }[provider];

  return (
    <form action={() => signInAction(provider)}>
      <button
        type="submit"
        className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors ${bgColor}`}
      >
        <Image src={logo} alt={provider} width={20} height={20} />
        {provider.charAt(0).toUpperCase() + provider.slice(1)}로 로그인
      </button>
    </form>
  );
}

export function SignInButtonList() {
  return (
    <div className="mx-auto flex w-full flex-col gap-3">
      <SignInButton provider="google" logo={Google} />
      <SignInButton provider="naver" logo={Naver} />
      <SignInButton provider="kakao" logo={Kakao} />
    </div>
  );
}
