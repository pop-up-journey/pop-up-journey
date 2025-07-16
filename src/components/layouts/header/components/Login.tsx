'use client';

import SignInButton from '@/features/sign-in/components/SignInButton';
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
          <SignInButton />
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
              <DropdownItem key="host-center" onPress={() => router.push('/host-center')}>
                {/** TODO: 호스트 인 경우에만 보여주기, 호스트 아닌 경우에는 disabled하게 혹은 호스트센터 버튼 누르면 호스트가 아닐 경우 host로 바꿀 수 있는 프로필 이동
                 * 호스트가 아닌 경우 : 호스트로 변경
                 * 호스트면 : 호스트 센터
                 */}
                호스트
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
