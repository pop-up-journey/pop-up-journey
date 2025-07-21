import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <section aria-label="Popup Journey Logo">
      <div style={{ width: '140px', height: '64px', position: 'relative', overflow: 'hidden' }}>
        <Link href="/">
          <Image src="/logo.png" alt="팝업의 여정 로고" fill style={{ objectFit: 'cover' }} priority />
        </Link>
      </div>
    </section>
  );
}
