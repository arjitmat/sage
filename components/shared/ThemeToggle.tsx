'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    const isDarkMode = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className="w-[44px] h-[24px] rounded-full bg-sage-500/20 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-[44px] h-[24px] rounded-full transition-colors duration-300 bg-sage-500 dark:bg-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:ring-offset-2"
      aria-label="Toggle Dark Mode"
    >
      <div
        className={`absolute top-[3px] left-[3px] bg-white w-[18px] h-[18px] rounded-full shadow-sm transform transition-transform duration-300 flex items-center justify-center ${
          isDark ? 'translate-x-[20px]' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <Moon size={10} className="text-sage-800" />
        ) : (
          <Sun size={10} className="text-sage-500" />
        )}
      </div>
    </button>
  );
};
