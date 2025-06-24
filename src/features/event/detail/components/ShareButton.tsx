import Button from '@/components/common/button';
import { useParams } from 'next/navigation';
import { useClipboard } from 'react-haiku';
export default function ShareButton() {
  const params = useParams();
  const clipboard = useClipboard({ timeout: 2000 });
  const currentURL = `${process.env.NEXT_PUBLIC_API_URL_DEV}/event/${params.id}`;
  return (
    <Button fullWidth onPress={() => clipboard.copy(currentURL)}>
      {clipboard.copied ? '링크 복사 완료!' : '공유하기'}
    </Button>
  );
}
