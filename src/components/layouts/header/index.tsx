'use client';

import { Link, Navbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/react';
import { useEffect, useState } from 'react';
import { useScrollPosition } from 'react-haiku';
import CategoryTab, { categories } from './components/CategoryTab';
import Login from './components/Login';
import Logo from './components/Logo';
import NavInput from './components/NavInput';

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scroll, _] = useScrollPosition() as [{ x: number; y: number }, unknown];

  useEffect(() => {
    if (!hasScrolled && scroll.y > 70) setHasScrolled(true);
    else if (hasScrolled && scroll.y < 20) setHasScrolled(false);
  }, [scroll.y, hasScrolled]);

  return (
    <header
      className={`${hasScrolled ? 'z-[100]' : ''} sticky top-0 mx-auto max-w-[1440px] transition-all duration-300`}
    >
      <Navbar
        className={`${hasScrolled ? 'mx-auto h-20 px-6' : 'mx-auto h-[80px] bg-transparent !backdrop-filter-none'} transition-all duration-300 ease-in-out`}
        isMenuOpen={isMenuOpen}
        isBlurred={true}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
      >
        <NavbarContent className="flex-1" justify="start">
          <NavbarMenuToggle className="pr-2 sm:hidden" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="flex-[3] gap-4 sm:flex" justify="center">
          <NavInput />
        </NavbarContent>

        <NavbarContent justify="end" className="flex-1">
          <Login />
        </NavbarContent>
        <NavbarMenu>
          {categories.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="w-full" color="foreground" href={item.href} size="md">
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <CategoryTab hasScrolled={hasScrolled} />
    </header>
  );
}
