'use client';

import { Palette, TrendingUp, PieChart as PieIcon, Activity, Lightbulb, Target, Zap } from 'lucide-react';
import { VisualData } from '@/types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, AreaChart, Area, Legend
} from 'recharts';

interface VisualCardProps {
  data: VisualData;
  onDownload?: () => void;
}

export const VisualCard = ({ data, onDownload }: VisualCardProps) => {
  // Check if data has an error
  const hasError = 'error' in data;

  // Parse numeric values from stats for charting
  const chartData = data.stats?.map((stat) => {
    const numericValue = parseFloat(stat.value.replace(/[^0-9.-]/g, '')) || 0;
    return {
      ...stat,
      numericValue,
      displayValue: stat.value,
    };
  });

  // Color palette for charts
  const COLORS = ['#C07855', '#7A9B76', '#8FAA8B', '#E8A87C'];

  return (
    <div className="bg-cream-100 dark:bg-dark-card border border-sage-500/15 rounded-2xl p-8 hover:shadow-lg dark:hover:shadow-black/30 transition-shadow duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <Palette className="text-terracotta-500" size={24} />
          <div>
            <h2 className="font-heading font-bold text-2xl text-sage-800 dark:text-cream-50">
              Comprehensive Visual Infographic
            </h2>
            <p className="font-sans text-sm text-sage-600 dark:text-dark-muted">
              Multi-dimensional visual analysis
            </p>
          </div>
        </div>
        {onDownload && !hasError && (
          <button
            onClick={onDownload}
            className="text-terracotta-500 hover:text-terracotta-600 font-medium text-sm"
          >
            Download High-Res
          </button>
        )}
      </div>

      {hasError ? (
        <div className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg border border-sage-200 dark:border-sage-700 p-8 flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
              <Palette className="text-red-500" size={32} />
            </div>
            <h3 className="font-heading font-semibold text-lg text-sage-800 dark:text-cream-50 mb-2">
              Visual Generation Failed
            </h3>
            <p className="text-sm text-sage-600 dark:text-sage-300">
              {(data as any).error || 'Unable to generate visual summary for this document.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg border border-sage-200 dark:border-sage-700 p-8">
          {/* Check for AI-generated infographic */}
          {(data as any).ai_infographic ? (
            <div className="w-full flex flex-col gap-6">
              <div className="w-full p-6 bg-gradient-to-r from-sage-500 to-sage-600 rounded-2xl text-white text-center shadow-lg">
                <h3 className="font-heading font-bold text-2xl mb-2">{data.header}</h3>
                <p className="text-sm text-white/90">AI-Generated Visual Summary</p>
              </div>
              <div className="flex-1 min-h-0 flex items-center justify-center">
                <img
                  src={(data as any).ai_infographic}
                  alt={data.header}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-8">
              {/* Header Banner */}
              <div className="w-full p-8 bg-gradient-to-r from-sage-500 to-sage-600 rounded-2xl text-white text-center shadow-lg">
                <h3 className="font-heading font-bold text-3xl mb-3">{data.header}</h3>
                <div className="h-1.5 w-32 bg-white/40 mx-auto rounded-full"></div>
              </div>

            {/* Highlights Section */}
            {data.highlights && data.highlights.length > 0 && (
              <div className="grid md:grid-cols-3 gap-4">
                {data.highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-terracotta-50 to-cream-100 dark:from-terracotta-900/20 dark:to-sage-800 p-5 rounded-xl border border-terracotta-200 dark:border-terracotta-700 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-terracotta-500 flex items-center justify-center shrink-0">
                        {idx === 0 && <Target className="text-white" size={20} />}
                        {idx === 1 && <Lightbulb className="text-white" size={20} />}
                        {idx === 2 && <Zap className="text-white" size={20} />}
                      </div>
                      <p className="font-sans text-sm text-sage-800 dark:text-sage-100 leading-relaxed font-medium">
                        {highlight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Charts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bar Chart - Key Metrics */}
              <div className="bg-cream-50 dark:bg-sage-800 rounded-xl border border-sage-100 dark:border-sage-700 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="text-sage-500" size={20} />
                  <h4 className="font-heading font-semibold text-lg text-sage-800 dark:text-cream-50">
                    Key Metrics
                  </h4>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                    <XAxis
                      dataKey="label"
                      angle={-45}
                      textAnchor="end"
                      height={90}
                      tick={{ fill: '#7A9B76', fontSize: 11 }}
                    />
                    <YAxis tick={{ fill: '#7A9B76', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FDFBF7',
                        border: '1px solid #7A9B76',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      labelStyle={{ color: '#2A2820', fontWeight: 'bold' }}
                      formatter={(value: any, name: string | undefined, props: any) => [props.payload.displayValue, 'Value']}
                    />
                    <Bar dataKey="numericValue" radius={[8, 8, 0, 0]}>
                      {chartData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart - Distribution */}
              {data.distribution && data.distribution.length > 0 && (
                <div className="bg-cream-50 dark:bg-sage-800 rounded-xl border border-sage-100 dark:border-sage-700 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <PieIcon className="text-terracotta-500" size={20} />
                    <h4 className="font-heading font-semibold text-lg text-sage-800 dark:text-cream-50">
                      Distribution
                    </h4>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={data.distribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={3}
                        dataKey="percentage"
                        label={({ category, percentage }) => `${category}: ${percentage}%`}
                        labelLine={{ stroke: '#7A9B76', strokeWidth: 1 }}
                      >
                        {data.distribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FDFBF7',
                          border: '1px solid #7A9B76',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Timeline Area Chart */}
            {data.timeline && data.timeline.length > 0 && (
              <div className="bg-cream-50 dark:bg-sage-800 rounded-xl border border-sage-100 dark:border-sage-700 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="text-sage-600" size={20} />
                  <h4 className="font-heading font-semibold text-lg text-sage-800 dark:text-cream-50">
                    Timeline Analysis
                  </h4>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={data.timeline} margin={{ top: 10, right: 30, left: 10, bottom: 30 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7A9B76" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#7A9B76" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                    <XAxis
                      dataKey="period"
                      tick={{ fill: '#7A9B76', fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: '#7A9B76', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FDFBF7',
                        border: '1px solid #7A9B76',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#7A9B76"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Content Blocks */}
            <div className="grid md:grid-cols-3 gap-4">
              {data.content_blocks?.map((block, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-cream-50 to-sage-50 dark:from-sage-800 dark:to-sage-900 p-6 rounded-xl border border-sage-200 dark:border-sage-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-lg bg-sage-500 flex items-center justify-center shrink-0 shadow-md">
                      <span className="font-heading font-bold text-xl text-white">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-semibold text-lg text-sage-800 dark:text-cream-100 mb-2">
                        {block.title}
                      </h4>
                      <p className="font-sans text-sm text-sage-600 dark:text-sage-200 leading-relaxed">
                        {block.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="w-full h-14 bg-gradient-to-r from-terracotta-100 to-terracotta-50 dark:from-terracotta-900/20 dark:to-sage-800 rounded-xl flex items-center justify-between px-6 shadow-sm border border-terracotta-200 dark:border-terracotta-700">
              <span className="text-sm font-sans font-medium text-terracotta-700 dark:text-terracotta-300">
                Generated by Sage AI • Comprehensive Visual Analysis
              </span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-terracotta-500 to-terracotta-600 shadow-md"></div>
            </div>
          </div>
          )}
        </div>
      )}
    </div>
  );
};
