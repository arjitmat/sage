'use client';

export const Footer = () => {
  return (
    <footer className="px-12 py-12 bg-sage-800 dark:bg-[#1A1F18] text-cream-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cream-100 w-6 h-6"
              >
                <path d="M2 22C2 22 20 18 20 5C20 5 18 2 15 2C12 2 2 13 2 22Z" />
                <path d="M13 8C13 8 7 13 7 19" />
                <path d="M9 12C9 12 11 10 13 10" />
              </svg>
              <span className="font-heading font-bold text-xl tracking-tight text-cream-100">Sage</span>
            </div>
            <p className="text-sage-200 dark:text-dark-muted font-sans text-sm max-w-xs">
              Wisdom from every document. Transform your reading into understanding with AI-powered insights.
            </p>
          </div>
        </div>

        <div className="border-t border-sage-700 dark:border-white/10 pt-8">
          <p className="text-xs text-sage-400 dark:text-dark-muted text-center">© 2025 Sage AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
