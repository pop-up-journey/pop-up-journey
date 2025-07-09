import { useEffect, useState } from 'react';

export default function useResizeUi() {
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const check = () => setIsMdUp(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return { isMdUp };
}
