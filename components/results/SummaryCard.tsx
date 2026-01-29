'use client';

import { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { Summary } from '@/types';

interface SummaryCardProps {
  data: Summary;
  onDownload?: () => void;
}

export const SummaryCard = ({ data, onDownload }: SummaryCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-cream-100 dark:bg-dark-card border border-sage-500/15 rounded-2xl p-8 hover:shadow-lg dark:hover:shadow-black/30 transition-shadow duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <FileText className="text-terracotta-500" size={24} />
          <div>
            <h2 className="font-heading font-bold text-2xl text-sage-800 dark:text-cream-50">
              Executive Summary
            </h2>
            <p className="font-sans text-sm text-sage-600 dark:text-dark-muted">
              {data.key_findings.length} key findings
            </p>
          </div>
        </div>
        {onDownload && (
          <button
            onClick={onDownload}
            className="p-2 hover:bg-sage-200 dark:hover:bg-sage-800 rounded-full transition-colors text-sage-600 dark:text-sage-300"
          >
            <Download size={20} />
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-heading font-semibold text-xl text-terracotta-500 mb-3">
            Key Findings
          </h3>
          <ul className="space-y-2">
            {data.key_findings.map((finding, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-terracotta-500 mt-1">•</span>
                <span className="font-sans text-base leading-relaxed text-sage-800 dark:text-cream-100">
                  {finding}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-xl text-terracotta-500 mb-3">
            Main Arguments
          </h3>
          <p className="font-sans text-base leading-relaxed text-sage-800 dark:text-cream-100">
            {data.main_arguments}
          </p>
        </div>

        {expanded && (
          <div className="pt-6">
            <h3 className="font-heading font-semibold text-xl text-terracotta-500 mb-3">
              Conclusions
            </h3>
            <p className="font-sans text-base leading-relaxed text-sage-800 dark:text-cream-100">
              {data.conclusions}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-6 text-terracotta-500 dark:text-terracotta-400 font-medium text-sm hover:underline focus:outline-none"
      >
        {expanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
};
