import { categories } from '@/configs/category';
import Link from 'next/link';

interface CategoryTabProps {
  hasScrolled: boolean;
}

export default function CategoryTab({ hasScrolled }: CategoryTabProps) {
  return (
    <section
      aria-label="category-tab"
      className={`border-divider border-btransition-all w-full duration-300 ${
        hasScrolled ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-16 bg-transparent'
      } hidden sm:block`}
    >
      <div className="container mx-auto flex items-center justify-center overflow-x-auto">
        <nav className="flex gap-8 px-2 pb-2 lg:gap-10">
          {categories.map((category) => (
            <Link
              key={category}
              color="foreground"
              href={`/popup/search?tags=${encodeURIComponent(category)}`}
              className="text-sm font-medium whitespace-nowrap"
            >
              {category}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
