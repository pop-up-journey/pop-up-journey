'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();

  const hideCategoryPattern = /(\/add-info|\/register|\/popup\/[^/]+\/participate)$/;
  const hideCategoryTab = hideCategoryPattern.test(pathname);

  return <Header hideCategoryTab={hideCategoryTab} />;
}
