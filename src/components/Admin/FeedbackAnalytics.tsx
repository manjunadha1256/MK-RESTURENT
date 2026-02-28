/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  TrendingUp
} from 'lucide-react';
import { GlassCard } from '../Shared/GlassCard';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const FeedbackAnalytics: React.FC = () => {
  const { feedback } = useApp();

  const ratingCounts = feedback.reduce((acc: any, curr) => {
    acc[curr.rating] = (acc[curr.rating] || 0) + 1;
    return acc;
  }, {});

  const ratingData = [
    { name: '5 Stars', value: ratingCounts[5] || 0, color: '#10b981' },
    { name: '4 Stars', value: ratingCounts[4] || 0, color: '#3b82f6' },
    { name: '3 Stars', value: ratingCounts[3] || 0, color: '#f59e0b' },
    { name: '2 Stars', value: ratingCounts[2] || 0, color: '#f43f5e' },
    { name: '1 Star', value: ratingCounts[1] || 0, color: '#9f1239' },
  ];

  const avgRating = feedback.length > 0 
    ? (feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length).toFixed(1)
    : '0.0';

  const wordCloud = [
    { word: 'Delicious', count: 124 },
    { word: 'Traditional', count: 98 },
    { word: 'Fast', count: 85 },
    { word: 'Authentic', count: 76 },
    { word: 'Spicy', count: 64 },
    { word: 'Fresh', count: 52 },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Rating Distribution */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 h-[400px] flex flex-col">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-zinc-900">Rating Distribution</h3>
          <p className="text-sm text-zinc-500">Breakdown of customer satisfaction scores</p>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ratingData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
              >
                {ratingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" align="center" iconType="circle" layout="horizontal" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feedback Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 h-[400px] flex flex-col">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-zinc-900">Feedback Summary</h3>
          <p className="text-sm text-zinc-500">Key metrics and latest customer voice</p>
        </div>
        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-600 border border-emerald-100 shadow-sm">
                <Star size={28} fill="currentColor" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Average Rating</p>
                <h4 className="text-3xl font-black text-zinc-900">{avgRating} <span className="text-lg text-zinc-400 font-medium">/ 5.0</span></h4>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                <TrendingUp size={16} />
                <span>+0.2</span>
              </div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">this week</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Top Keywords</p>
            <div className="flex flex-wrap gap-2">
              {wordCloud.map((item, i) => (
                <span 
                  key={i}
                  className="rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-1.5 text-xs font-bold text-zinc-600 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 cursor-default"
                >
                  {item.word} <span className="text-[10px] opacity-50 ml-1">{item.count}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-50 border border-zinc-100 p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <MessageSquare size={48} />
            </div>
            <p className="text-xs italic text-zinc-600 leading-relaxed relative z-10">
              "{feedback[0]?.comment || 'No feedback yet'}"
            </p>
            <p className="mt-3 text-[10px] font-black text-emerald-600 uppercase tracking-widest relative z-10">— {feedback[0]?.userId || 'Anonymous'}</p>
          </div>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 h-[400px] flex flex-col">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-zinc-900">Sentiment Analysis</h3>
          <p className="text-sm text-zinc-500">AI-powered customer mood tracking</p>
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2 text-emerald-600">
                <ThumbsUp size={14} />
                Positive
              </span>
              <span className="text-zinc-900">92%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2 text-zinc-400">
                <MessageSquare size={14} />
                Neutral
              </span>
              <span className="text-zinc-900">5%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
              <div className="h-full bg-zinc-300 rounded-full" style={{ width: '5%' }} />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2 text-rose-500">
                <ThumbsDown size={14} />
                Negative
              </span>
              <span className="text-zinc-900">3%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: '3%' }} />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
            <p className="text-xs leading-relaxed text-zinc-600">
              Sentiment is up by <span className="text-emerald-600 font-black">4.2%</span> compared to last month. Customers are loving the new "North India" category items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
