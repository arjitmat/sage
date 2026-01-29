'use client';

import { useState } from 'react';
import { Brain, Plus, Minus, Maximize } from 'lucide-react';
import { MindMapNode } from '@/types';

interface MindMapCardProps {
  nodes: MindMapNode[];
}

export const MindMapCard = ({ nodes }: MindMapCardProps) => {
  const [scale, setScale] = useState(1);

  const centerNode = nodes.find(n => n.level === 0);
  const level1Nodes = nodes.filter(n => n.level === 1);
  const level2Nodes = nodes.filter(n => n.level === 2);

  // Simple layout calculation
  const angleStep = (2 * Math.PI) / (level1Nodes.length || 1);

  return (
    <div className="bg-cream-100 dark:bg-dark-card border border-sage-500/15 rounded-2xl p-8 hover:shadow-lg dark:hover:shadow-black/30 transition-shadow duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <Brain className="text-terracotta-500" size={24} />
          <div>
            <h2 className="font-heading font-bold text-2xl text-sage-800 dark:text-cream-50">
              Interactive Mind Map
            </h2>
            <p className="font-sans text-sm text-sage-600 dark:text-dark-muted">
              {nodes.length} concepts mapped
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setScale(s => Math.min(s + 0.1, 2))}
            className="p-2 bg-white dark:bg-sage-800 rounded-lg shadow-sm hover:bg-sage-50 dark:hover:bg-sage-700 text-sage-600 dark:text-sage-200"
          >
            <Plus size={18} />
          </button>
          <button
            onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}
            className="p-2 bg-white dark:bg-sage-800 rounded-lg shadow-sm hover:bg-sage-50 dark:hover:bg-sage-700 text-sage-600 dark:text-sage-200"
          >
            <Minus size={18} />
          </button>
          <button className="p-2 bg-white dark:bg-sage-800 rounded-lg shadow-sm hover:bg-sage-50 dark:hover:bg-sage-700 text-sage-600 dark:text-sage-200">
            <Maximize size={18} />
          </button>
        </div>
      </div>

      <div className="h-[500px] w-full bg-cream-50 dark:bg-[#252A26] rounded-xl border border-sage-500/10 overflow-hidden relative flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#7A9B76 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        >
          <svg width="100%" height="100%" viewBox="0 0 600 500" className="absolute inset-0">
            {/* Draw connections */}
            {level1Nodes.map((node, i) => {
              const angle = angleStep * i;
              const x = 300 + Math.cos(angle) * 150;
              const y = 250 + Math.sin(angle) * 120;
              return (
                <path
                  key={`conn-${node.id}`}
                  d={`M 300 250 Q ${(300 + x) / 2} ${(250 + y) / 2} ${x} ${y}`}
                  stroke="#7A9B76"
                  strokeWidth="2"
                  fill="none"
                  className="opacity-60"
                />
              );
            })}

            {/* Center node */}
            {centerNode && (
              <g>
                <circle cx="300" cy="250" r="50" fill="#C07855" className="shadow-lg" />
                <text
                  x="300"
                  y="250"
                  textAnchor="middle"
                  dy=".3em"
                  fill="white"
                  className="font-heading font-bold text-sm"
                  style={{ fontSize: '14px' }}
                >
                  {centerNode.label.length > 15
                    ? centerNode.label.substring(0, 15) + '...'
                    : centerNode.label}
                </text>
              </g>
            )}

            {/* Level 1 nodes */}
            {level1Nodes.map((node, i) => {
              const angle = angleStep * i;
              const x = 300 + Math.cos(angle) * 150;
              const y = 250 + Math.sin(angle) * 120;
              return (
                <g key={node.id}>
                  <circle cx={x} cy={y} r="35" fill="#7A9B76" />
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dy=".3em"
                    fill="white"
                    className="font-heading font-medium text-xs"
                    style={{ fontSize: '11px' }}
                  >
                    {node.label.length > 12
                      ? node.label.substring(0, 12) + '...'
                      : node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/50 p-3 rounded-lg text-xs font-sans text-sage-600 dark:text-sage-300 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-terracotta-500"></div>
            <span>Main Topic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-sage-500"></div>
            <span>Sub-concept</span>
          </div>
        </div>
      </div>

      {/* Node List */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-heading font-semibold text-sm text-sage-700 dark:text-sage-300 mb-2">
            Main Branches ({level1Nodes.length})
          </h4>
          <ul className="space-y-1">
            {level1Nodes.slice(0, 6).map(node => (
              <li key={node.id} className="text-sm text-sage-600 dark:text-sage-200 flex items-start gap-2">
                <span className="text-sage-500 mt-0.5">•</span>
                <span>{node.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm text-sage-700 dark:text-sage-300 mb-2">
            Details ({level2Nodes.length})
          </h4>
          <ul className="space-y-1">
            {level2Nodes.slice(0, 6).map(node => (
              <li key={node.id} className="text-sm text-sage-600 dark:text-sage-200 flex items-start gap-2">
                <span className="text-sage-500 mt-0.5">•</span>
                <span>{node.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
