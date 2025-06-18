import GreetingImg from '@/assets/add-info/greeting.png';
import Image from 'next/image';

export default function Greeting() {
  return (
    <section aria-label="greeting">
      <Image src={GreetingImg} alt="greeting" />
    </section>
  );
}
