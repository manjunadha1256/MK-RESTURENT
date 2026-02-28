/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  UserCheck 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../Shared/GlassCard';

export const StatsCards: React.FC = () => {
  const { orders, items, workers } = useApp();

  const today = new Date().toDateString();
  const todayOrders = orders.filter(o => new Date(o.timestamp).toDateString() === today);
  const totalRevenue = todayOrders.reduce((acc, curr) => acc + curr.total, 0);
  const totalProfit = totalRevenue * 0.35; // Simulated 35% profit margin
  const totalLoss = totalRevenue * 0.05; // Simulated 5% loss (wastage/returns)

  const stats = [
    {
      label: 'Total Orders Today',
      value: todayOrders.length,
      icon: ShoppingBag,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      trend: '+12%',
      trendUp: true
    },
    {
      label: 'Total Revenue Today',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      trend: '+8%',
      trendUp: true
    },
    {
      label: 'Total Profit Today',
      value: `₹${totalProfit.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
      trend: '+15%',
      trendUp: true
    },
    {
      label: 'Total Loss Today',
      value: `₹${totalLoss.toLocaleString()}`,
      icon: TrendingDown,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
      trend: '-2%',
      trendUp: false
    },
    {
      label: 'Active Users',
      value: '1,284',
      icon: Users,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      trend: '+5%',
      trendUp: true
    },
    {
      label: 'Silent Users',
      value: '432',
      icon: UserCheck,
      color: 'text-zinc-500',
      bg: 'bg-zinc-500/10',
      trend: '+1%',
      trendUp: true
    },
    {
      label: 'Total Workers',
      value: workers.length,
      icon: Users,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      trend: 'Stable',
      trendUp: true
    },
    {
      label: 'Inventory Items',
      value: items.length,
      icon: Package,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
      trend: 'Full Stock',
      trendUp: true
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className={cn("rounded-xl p-3", stat.bg)}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold",
              stat.trendUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            )}>
              {stat.trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {stat.trend}
            </div>
          </div>
          <div className="mt-6">
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">{stat.label}</p>
            <h3 className="mt-1 text-2xl font-black text-zinc-900">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
