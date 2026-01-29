'use client';

import { Scale, CheckCircle, AlertTriangle, Download } from 'lucide-react';
import { DebateAnalysis } from '@/types';

interface DebateCardProps {
  data: DebateAnalysis;
  onDownload?: () => void;
}

export const DebateCard = ({ data, onDownload }: DebateCardProps) => {
  return (
    <div className="bg-cream-100 dark:bg-dark-card border border-sage-500/15 rounded-2xl p-8 hover:shadow-lg dark:hover:shadow-black/30 transition-shadow duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <Scale className="text-sage-500" size={24} />
          <div>
            <h2 className="font-heading font-bold text-2xl text-sage-800 dark:text-cream-50">
              Multi-Perspective Analysis
            </h2>
            <p className="font-sans text-sm text-sage-600 dark:text-dark-muted">
              {data.pros.length + data.cons.length} viewpoints explored
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

      <div className="bg-cream-300/10 dark:bg-cream-300/5 rounded-xl p-4 mb-8 text-center border border-cream-300/20">
        <h3 className="font-heading font-semibold text-xl text-sage-800 dark:text-cream-50">
          "{data.topic}"
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Supporting Arguments */}
        <div className="bg-sage-500/5 dark:bg-sage-500/10 rounded-xl p-6 border-l-4 border-sage-500 hover:bg-sage-500/10 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-4 text-sage-600 dark:text-sage-300">
            <CheckCircle size={20} />
            <h4 className="font-heading font-semibold text-lg">Supporting Arguments</h4>
          </div>
          <ul className="space-y-4">
            {data.pros.map((pro, i) => (
              <li key={i}>
                <p className="font-heading font-medium text-sage-800 dark:text-cream-100 mb-1">
                  {pro.point}
                </p>
                <p className="font-sans text-sm text-sage-600 dark:text-sage-300">
                  {pro.explanation}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Challenging Arguments */}
        <div className="bg-terracotta-500/5 dark:bg-terracotta-500/10 rounded-xl p-6 border-l-4 border-terracotta-500 hover:bg-terracotta-500/10 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-4 text-terracotta-600 dark:text-terracotta-300">
            <AlertTriangle size={20} />
            <h4 className="font-heading font-semibold text-lg">Challenging Arguments</h4>
          </div>
          <ul className="space-y-4">
            {data.cons.map((con, i) => (
              <li key={i}>
                <p className="font-heading font-medium text-sage-800 dark:text-cream-100 mb-1">
                  {con.point}
                </p>
                <p className="font-sans text-sm text-sage-600 dark:text-sage-300">
                  {con.explanation}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-cream-50 dark:bg-black/20 rounded-xl p-6 border border-sage-500/10">
        <h4 className="font-heading font-semibold text-lg text-sage-800 dark:text-cream-50 mb-2">
          Balanced Perspective
        </h4>
        <p className="font-sans text-base text-sage-600 dark:text-sage-200">
          {data.balanced_perspective}
        </p>
      </div>
    </div>
  );
};
