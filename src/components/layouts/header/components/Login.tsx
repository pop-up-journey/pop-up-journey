'use client';

import SignInModal from '@/features/sign-in/components/SignInModal';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem } from '@heroui/react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { If } from 'react-haiku';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <section aria-label="login">
      <NavbarItem>
        <If isTrue={!session?.user}>
          <SignInModal />
        </If>
        <If isTrue={!!session?.user}>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                src={session?.user?.image ?? undefined}
                showFallback
                isBordered
                as="button"
                className="cursor-pointer"
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="light">
              <DropdownItem key="profile" onPress={() => router.push('/profile')}>
                프로필
              </DropdownItem>
              <DropdownItem key="logout" variant="flat" color="danger" onPress={() => signOut()}>
                로그아웃
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </If>
      </NavbarItem>
    </section>
  );
}
