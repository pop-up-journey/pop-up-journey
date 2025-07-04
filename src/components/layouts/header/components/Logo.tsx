import Link from 'next/link';

export default function Logo() {
  return (
    <section aria-label="Popup Journey Logo">
      <Link href="/">
        <p className="font-bold text-inherit">팝업의 여정</p>
      </Link>
    </section>
  );
}
