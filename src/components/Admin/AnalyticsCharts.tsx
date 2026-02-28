/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../Shared/GlassCard';

export const AnalyticsCharts: React.FC = () => {
  const { items } = useApp();

  // 1. Daily Revenue Line Chart (Simulated hourly data)
  const hourlyData = Array.from({ length: 12 }).map((_, i) => ({
    time: `${i * 2}:00`,
    revenue: Math.floor(Math.random() * 5000) + 1000
  }));

  // 2. Weekly Sales Bar Chart
  const weeklyData = [
    { day: 'Mon', sales: 4500 },
    { day: 'Tue', sales: 5200 },
    { day: 'Wed', sales: 4800 },
    { day: 'Thu', sales: 6100 },
    { day: 'Fri', sales: 7500 },
    { day: 'Sat', sales: 9200 },
    { day: 'Sun', sales: 8800 },
  ];

  // 3. Category Wise Pie Chart
  const categoryCounts = items.reduce((acc: any, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.keys(categoryCounts).map(cat => ({
    name: cat,
    value: categoryCounts[cat]
  }));

  const COLORS = ['#10b981', '#3b82f6', '#6366f1', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

  // 5. Monthly Profit/Loss Area Chart
  const monthlyData = Array.from({ length: 6 }).map((_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
    profit: Math.floor(Math.random() * 50000) + 20000,
    loss: Math.floor(Math.random() * 10000) + 2000
  }));

  const ChartCard: React.FC<{ title: string; subtitle: string; children: React.ReactNode; className?: string }> = ({ title, subtitle, children, className }) => (
    <div className={cn("bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 flex flex-col", className)}>
      <div className="mb-6">
        <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
        <p className="text-sm text-zinc-500">{subtitle}</p>
      </div>
      <div className="flex-1 min-h-[300px]">
        {children}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Daily Revenue */}
      <ChartCard 
        title="Daily Revenue" 
        subtitle="Hourly breakdown of sales across all categories"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="time" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
            />
            <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
            <Line 
              name="Revenue (₹)"
              type="monotone" 
              dataKey="revenue" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} 
              activeDot={{ r: 6, strokeWidth: 0 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Weekly Sales */}
      <ChartCard 
        title="Weekly Performance" 
        subtitle="Total sales volume for the current week"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="day" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
            />
            <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
            <Bar name="Sales (₹)" dataKey="sales" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Category Distribution */}
      <ChartCard 
        title="Category Distribution" 
        subtitle="Market share by product category"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" align="center" iconType="circle" layout="horizontal" />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Monthly Profit/Loss */}
      <ChartCard 
        title="Profit & Loss" 
        subtitle="Comparison of monthly earnings vs operational costs"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
            <Area name="Profit" type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
            <Area name="Loss" type="monotone" dataKey="loss" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorLoss)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Business Intelligence Insights */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-zinc-100 p-8">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-zinc-900">Business Intelligence Insights</h3>
          <p className="text-sm text-zinc-500">Key performance indicators and growth metrics</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: 'Top Category', value: 'South India', sub: '42% of sales', color: 'text-emerald-600' },
            { label: 'Least Category', value: 'Tea', sub: '5% of sales', color: 'text-rose-600' },
            { label: 'Revenue Growth', value: '+24.5%', sub: 'vs last month', color: 'text-emerald-600' },
            { label: 'Customer Retention', value: '78%', sub: 'Repeat users', color: 'text-blue-600' },
            { label: 'Avg Order Value', value: '₹642', sub: 'Per customer', color: 'text-amber-600' },
            { label: 'Peak Order Time', value: '1:00 PM', sub: 'Lunch rush', color: 'text-indigo-600' },
          ].map((insight, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">{insight.label}</span>
              <span className={cn("mt-2 text-xl font-black", insight.color)}>{insight.value}</span>
              <span className="text-xs text-zinc-500 mt-1">{insight.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
