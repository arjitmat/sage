'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/upload', label: 'App' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="h-[64px] px-12 w-full flex items-center justify-between border-b border-sage-500/10 dark:border-sage-400/10 bg-cream-50/80 dark:bg-sage-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <Logo />

      <div className="hidden md:flex items-center gap-6">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[15px] font-sans transition-colors ${
              pathname === link.href
                ? 'text-sage-600 dark:text-sage-300 font-medium border-b-2 border-sage-500 dark:border-sage-400'
                : 'text-sage-600/60 dark:text-sage-300/60 hover:text-sage-600 dark:hover:text-sage-300'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  );
};
