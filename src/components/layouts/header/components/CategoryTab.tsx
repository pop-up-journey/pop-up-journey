import Link from 'next/link';

interface CategoryTabProps {
  hasScrolled: boolean;
}

export const categories = [
  { name: 'Home', href: '/' },
  { name: 'Fashion', href: '/fashion' },
  { name: 'Electronics', href: '/electronics' },
  { name: 'Food', href: '/food' },
  { name: 'Beauty', href: '/beauty' },
  { name: 'Home & Garden', href: '/home-garden' },
  { name: 'Sports', href: '/sports' },
  { name: 'Books', href: '/books' },
];

export default function CategoryTab({ hasScrolled }: CategoryTabProps) {
  return (
    <section
      aria-label="category-tab"
      className={`border-divider w-full border-b transition-all duration-300 ${
        hasScrolled ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-16 bg-transparent'
      } hidden sm:block`}
    >
      <div className="container mx-auto flex overflow-x-auto">
        <nav className="flex items-center justify-center gap-6 px-4 py-2">
          {categories.map((category) => (
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
