'use client';

import { Button, Input, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Header() {
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const router = useRouter();
  React.useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-[100] transition-all duration-300`}>
      <Navbar
        className={`${hasScrolled ? 'mx-auto h-20 max-w-full bg-[#fff3f6]/40 px-6' : 'mx-auto h-[90px] bg-transparent px-30 pt-3 !backdrop-filter-none'} transition-all duration-300 ease-in-out`}
        isMenuOpen={isMenuOpen}
        isBlurred={true}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
        </NavbarContent>
        <div className="flex-1">
          <NavbarBrand>
            <p className="font-bold text-inherit">Popup Journey</p>
          </NavbarBrand>
        </div>
        <div className="flex-[3]">
          <NavbarContent className="hidden gap-4 sm:flex" justify="center">
            <Input
              classNames={{
                base: 'w-full max-w-full h-10',
                mainWrapper: 'h-full',
                input: 'text-small',
              }}
              placeholder="Search..."
              size="sm"
              type="search"
            />
          </NavbarContent>
        </div>
        <div className="flex-1">
          <NavbarContent justify="end">
            <NavbarItem>
              <Button color="primary" onPress={() => router.push('/sign-in')} variant="flat">
                로그인
              </Button>
            </NavbarItem>
          </NavbarContent>
        </div>
      </Navbar>
      <div
        className={`border-divider w-full border-b transition-all duration-300 ${
          hasScrolled ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-16 bg-transparent'
        }`}
      >
        <div className="container mx-auto flex overflow-x-auto">
          <nav className="flex items-center justify-start gap-6 px-4 py-2">
            <Link color="foreground" href="#" className="flex items-center gap-1 text-sm font-medium whitespace-nowrap">
              <span>Home</span>
            </Link>
            <Link color="foreground" href="#" className="text-sm font-medium whitespace-nowrap">
              Fashion
            </Link>
            <Link color="foreground" href="#" className="text-sm font-medium whitespace-nowrap">
              Electronics
            </Link>
            <Link color="foreground" href="#" className="text-sm font-medium whitespace-nowrap">
              Food
            </Link>
            <Link color="foreground" href="#" className="text-sm font-medium whitespace-nowrap">
              Beauty
            </Link>
            <Link color="foreground" href="#" className="text-sm font-medium whitespace-nowrap">
              Home & Garden
            </Link>
            <Link color="foreground" href="#" className="text-sm font-medium whitespace-nowrap">
              Sports
            </Link>
            <Link color="foreground" href="#" className="text-sm font-medium whitespace-nowrap">
              Books
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
