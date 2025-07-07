import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { Divider } from '@heroui/react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#fff3f6]/10 text-gray-400 backdrop-blur-md">
      <Divider />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between px-4 pt-5 pb-25 md:flex-row lg:py-5">
        {/* 좌측 컬럼*/}
        <div className="mb-2 text-center md:mb-0 md:text-left">
          <h3 className="relative mb-2 overflow-hidden bg-gradient-to-r from-purple-500 via-indigo-400 to-pink-500 bg-clip-text text-lg font-semibold text-transparent drop-shadow-[0_0_6px_rgba(255,150,200,0.5)]">
            <span>Project by Hunter Joe &amp; Yujeong Kim</span>
          </h3>
          <p className="mt-2 text-sm font-extralight">© 2025 Hunter Joe &amp; Yujeong Kim. All rights reserved.</p>
        </div>

        {/* 우측컬럼 : 1024px(lg)미만 -> Connect는 hidden */}
        <div className="flex flex-col items-start space-y-8 md:flex-row md:space-y-0 md:space-x-12">
          {/* Connect : 팀원 이메일 연결 */}
          <div className="hidden text-center md:text-left lg:block">
            <h3 className="mb-2 font-semibold">Connect.</h3>
            <ul className="space-y-2 text-sm">
              <li className="items-centerspace-x-2 flex cursor-pointer">
                <Link
                  href="mailto:hunterjoe9999@gmail.com"
                  aria-label="Email Hunter Joe"
                  className="inline-flex items-center space-x-2"
                >
                  <span>Hunter Joe</span>
                  <EnvelopeIcon className="h-4 w-4" />
                </Link>
              </li>
              <li className="flex cursor-pointer items-center space-x-2">
                <Link
                  href="mailto:ninakyj@gmail.com"
                  aria-label="Email Yujeong Kim"
                  className="inline-flex items-center space-x-2"
                >
                  <span>Yujeong Kim</span>
                  <EnvelopeIcon className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>

          {/* GitHub: 팀 레포지토리 연결 */}
          <div className="flex items-center justify-center space-x-2 text-center md:text-left lg:flex-col lg:items-start lg:space-y-2 lg:space-x-0">
            <h3 className="mb-2 font-semibold">GitHub.</h3>
            <ul className="text-sm">
              <li>
                <Link
                  href="https://github.com/pop-up-journey/pop-up-journey"
                  target="_blank"
                  className="inline-flex items-center space-x-2"
                >
                  <span className="hidden lg:block">Team Repo</span>
                  {/* //NOTE: heroicons에 깃허브 아이콘이 없어서 sipleicons의 cdn 이용함 */}
                  <img src="https://cdn.simpleicons.org/github/gray" alt="GitHub Icon" width="16" height="16" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
