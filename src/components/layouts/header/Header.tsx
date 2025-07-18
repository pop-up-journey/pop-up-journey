'use client';

import { categories } from '@/configs/category';
import { Link, Navbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/react';
import { useEffect, useState } from 'react';
import { useScrollPosition } from 'react-haiku';
import { CategoryTab, Login, Logo, Searchbar } from './components';

interface HeaderProps {
  hideCategoryTab?: boolean;
}

export default function Header({ hideCategoryTab = false }: HeaderProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scroll, _] = useScrollPosition() as [{ x: number; y: number }, unknown];

  useEffect(() => {
    if (!hasScrolled && scroll.y > 70) setHasScrolled(true);
    else if (hasScrolled && scroll.y < 20) setHasScrolled(false);
  }, [scroll.y, hasScrolled]);

  return (
    <div className={`${hasScrolled ? 'z-[100]' : ''} sticky top-0 mx-auto w-full`}>
      <Navbar
        className={`transition-all duration-300 ease-in-out ${hasScrolled ? 'mx-auto h-20 px-6' : 'mx-auto h-[80px] bg-transparent !backdrop-filter-none'}`}
        isMenuOpen={isMenuOpen}
        isBlurred={true}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="2xl"
      >
        <NavbarContent className="flex-1" justify="start">
          <NavbarMenuToggle className="pr-2 sm:hidden" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>
        {/* 서치바 */}
        <NavbarContent className="flex-[3] gap-4 sm:flex" justify="center">
          <Searchbar />
        </NavbarContent>

        <NavbarContent justify="end" className="flex-1">
          <Login />
        </NavbarContent>
        <NavbarMenu>
          {categories.map((category, index) => (
            <NavbarMenuItem key={`${category}-${index}`}>
              <Link
                className="w-full"
                color="foreground"
                href={`/popup/search?tags=${encodeURIComponent(category)}`}
                size="md"
              >
                {category}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      {!hideCategoryTab && <CategoryTab hasScrolled={hasScrolled} />}
    </div>
  );
}
