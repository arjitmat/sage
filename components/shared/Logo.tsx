'use client';

import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-sage-500 dark:text-cream-100 transition-colors duration-300"
      >
        <path
          d="M2 22C2 22 20 18 20 5C20 5 18 2 15 2C12 2 2 13 2 22Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 8C13 8 7 13 7 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 12C9 12 11 10 13 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="ml-1 font-heading font-bold text-[20px] tracking-[-0.5px] text-sage-800 dark:text-cream-50 transition-colors duration-300">
        Sage
      </span>
    </Link>
  );
};
