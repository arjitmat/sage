'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight, Download } from 'lucide-react';
import { FAQItem } from '@/types';

interface FAQCardProps {
  items: FAQItem[];
  onDownload?: () => void;
}

export const FAQCard = ({ items, onDownload }: FAQCardProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (openItems.length === items.length) {
      setOpenItems([]);
    } else {
      setOpenItems(items.map(i => i.id));
    }
  };

  return (
    <div className="bg-cream-100 dark:bg-dark-card border border-sage-500/15 rounded-2xl p-8 hover:shadow-lg dark:hover:shadow-black/30 transition-shadow duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="text-sage-500" size={24} />
          <div>
            <h2 className="font-heading font-bold text-2xl text-sage-800 dark:text-cream-50">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-sm text-sage-600 dark:text-dark-muted">
              {items.length} questions generated
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAll}
            className="text-xs font-medium text-sage-500 hover:text-sage-700 dark:text-sage-400 dark:hover:text-sage-200 uppercase tracking-wide"
          >
            {openItems.length === items.length ? 'Collapse All' : 'Expand All'}
          </button>
          {onDownload && (
            <button
              onClick={onDownload}
              className="p-2 hover:bg-sage-200 dark:hover:bg-sage-800 rounded-full transition-colors text-sage-600 dark:text-sage-300"
            >
              <Download size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border-b border-dashed border-sage-500/20 last:border-0 pb-4 last:pb-0"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-start text-left gap-3 group focus:outline-none"
            >
              <span className="mt-1 text-terracotta-500">
                {openItems.includes(item.id) ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </span>
              <span className="font-heading font-medium text-lg text-sage-800 dark:text-cream-50 group-hover:text-terracotta-500 dark:group-hover:text-terracotta-400 transition-colors">
                {item.question}
              </span>
            </button>
            {openItems.includes(item.id) && (
              <div className="pl-8 pt-3 pb-2">
                <p className="font-sans text-base leading-relaxed text-sage-600 dark:text-sage-200">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
