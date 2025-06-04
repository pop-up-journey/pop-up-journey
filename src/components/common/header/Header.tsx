'use client';

import { Button, Input, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';

export default function Header() {
  return (
    <header className="bg-background/70 sticky top-0 z-50 backdrop-blur-md">
      {/* 상단 네비게이션 */}
      <Navbar
        maxWidth="xl"
        isBordered
        isBlurred
        position="sticky"
        shouldHideOnScroll={false}
        className="bg-background/70 px-4"
      >
        {/* 왼쪽 영역 */}
        <NavbarContent className="w-1/5" justify="start">
          <NavbarBrand>
            <p className="font-semibold text-inherit">Popup Journey</p>
          </NavbarBrand>
        </NavbarContent>

        {/* 중앙 검색창 */}
        <NavbarContent className="w-3/5" justify="center">
          <Input
            classNames={{
              base: 'w-full h-10',
              mainWrapper: 'h-full',
              input: 'text-small',
            }}
            placeholder="Search..."
            size="sm"
            type="search"
          />
        </NavbarContent>

        {/* 우측 버튼 */}
        <NavbarContent className="w-1/5" justify="end">
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* 하단 카테고리 메뉴 */}
      <Navbar maxWidth="xl" isBlurred className="border-divider bg-background/70 border-t px-4">
        <NavbarContent justify="start" className="gap-4 overflow-x-auto py-2">
          {['Home', 'Books', 'Toys'].map((item) => (
            <NavbarItem key={item}>
              <Link href="#" className="text-sm font-medium whitespace-nowrap">
                {item}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>
    </header>
  );
}
