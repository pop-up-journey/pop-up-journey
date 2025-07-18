import Link from 'next/link';

interface CategoryTabProps {
  hasScrolled: boolean;
}

export const NAV_CATEGORIES = [
  { name: '패션/뷰티/헬스', href: '/' },
  { name: '푸드/음료', href: '/fashion' },
  { name: '인테리어/리빙', href: '/electronics' },
  { name: '디지털/게임/e스포츠', href: '/food' },
  { name: '콘텐츠/문화', href: '/beauty' },
  { name: '반려동물', href: '/home-garden' },
];

export default function CategoryTab({ hasScrolled }: CategoryTabProps) {
  return (
    <section
      aria-label="category-tab"
      className={`border-divider border-btransition-all w-full duration-300 ${
        hasScrolled ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-16 bg-transparent'
      } hidden sm:block`}
    >
      <div className="container mx-auto flex overflow-x-auto">
        <nav className="flex items-center justify-center gap-6 px-4 py-2">
          {NAV_CATEGORIES.map((category) => (
            <Link
              key={category.name}
              color="foreground"
              href={category.href}
              className="text-sm font-medium whitespace-nowrap"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
