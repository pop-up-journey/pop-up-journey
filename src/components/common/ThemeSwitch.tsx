'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { Switch } from '@heroui/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === 'dark';

  const handleThemeChange = (isSelected: boolean) => {
    setTheme(isSelected ? 'dark' : 'light');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      defaultSelected
      color="default"
      endContent={<SunIcon />}
      startContent={<MoonIcon />}
      isSelected={isDarkMode}
      onValueChange={handleThemeChange}
    />
  );
}
