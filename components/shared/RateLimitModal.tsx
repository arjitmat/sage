'use client';

import { X } from 'lucide-react';

interface RateLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RateLimitModal = ({ isOpen, onClose }: RateLimitModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 border border-sage-200 dark:border-sage-700">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sage-400 hover:text-sage-600 dark:hover:text-sage-200 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-terracotta-100 dark:bg-terracotta-900/30 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-terracotta-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="font-heading font-bold text-2xl text-sage-900 dark:text-cream-50 mb-3">
            Document Limit Reached
          </h2>

          {/* Message */}
          <p className="text-sage-600 dark:text-sage-300 mb-2">
            You have processed the maximum of 4 documents in this session.
          </p>

          <p className="text-sage-700 dark:text-sage-200 font-medium mb-6">
            Personalised dashboard and subscriptions coming soon!
          </p>

          {/* CTA */}
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-xl font-heading font-semibold transition-all shadow-sm hover:shadow-md"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
