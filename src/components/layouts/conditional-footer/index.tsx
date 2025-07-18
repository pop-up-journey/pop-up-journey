'use client';

import { usePathname } from 'next/navigation';
import Footer from './footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const hideFooterPattern = /\/(add-info|register|popup\/[^/]+\/participate)$/;
  const shouldHide = hideFooterPattern.test(pathname);

  const detailPattern = /^\/popup\/[^/]+$/;
  const extraClasses = detailPattern.test(pathname) ? 'pb-25 lg:pb-10' : '';

  if (shouldHide) return null;

  return <Footer className={extraClasses} />;
}
