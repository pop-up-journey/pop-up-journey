import Google from '@/assets/logos/google.svg';
import Kakao from '@/assets/logos/kakao.svg';
import Naver from '@/assets/logos/naver.svg';

export function ProviderLogo({ provider }: { provider: 'google' | 'kakao' | 'naver' }) {
  const Logo: React.FC<React.SVGProps<SVGSVGElement>> = {
    google: Google,
    kakao: Kakao,
    naver: Naver,
  }[provider];
  return <Logo width={20} height={20} className="rounded-full" />;
}
