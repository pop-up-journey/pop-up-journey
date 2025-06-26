import { useKakaoLoader as _useKakaoLoader } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
  const appkey = process.env.NEXT_PUBLIC_KAKAO_KEY!;
  if (!appkey) throw new Error('NEXT_PUBLIC_KAKAO_KEY is not set');

  const [isLoaded, error] = _useKakaoLoader({
    appkey,
    libraries: ['services', 'clusterer', 'drawing'],
  });

  return { isLoaded, error };
}
