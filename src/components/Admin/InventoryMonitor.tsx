/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../Shared/GlassCard';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export const InventoryMonitor: React.FC = () => {
  const { items } = useApp();

  const lowStockItems = items.filter(i => i.stock < 30).sort((a, b) => a.stock - b.stock);
  const outOfStockItems = items.filter(i => i.stock === 0);

  const stockData = items.slice(0, 10).map(i => ({
    name: i.name.split(' ')[0],
    stock: i.stock
  }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Stock Usage Chart */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 h-[400px] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">Stock Usage Monitor</h3>
            <p className="text-sm text-zinc-500">Real-time inventory levels across top items</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <RefreshCw size={14} className="animate-spin-slow" />
            <span>Auto-updating</span>
          </div>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="stock" radius={[4, 4, 0, 0]}>
                {stockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.stock === 0 ? '#f43f5e' : entry.stock < 30 ? '#f59e0b' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 h-[400px] flex flex-col">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-zinc-900">Smart Alerts</h3>
          <p className="text-sm text-zinc-500">Critical inventory notifications</p>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          {outOfStockItems.length > 0 && (
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 animate-pulse">
              <div className="flex items-center gap-3 text-rose-600 mb-2">
                <AlertTriangle size={18} />
                <span className="text-xs font-black uppercase tracking-wider">CRITICAL: OUT OF STOCK</span>
              </div>
              <div className="space-y-1">
                {outOfStockItems.slice(0, 3).map(i => (
                  <p key={i.id} className="text-xs font-bold text-rose-900">• {i.name}</p>
                ))}
                {outOfStockItems.length > 3 && <p className="text-[10px] text-rose-600 italic">+ {outOfStockItems.length - 3} more</p>}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <div className="flex items-center gap-3 text-amber-600 mb-3">
              <AlertTriangle size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Warning: Low Stock</span>
            </div>
            <div className="space-y-3">
              {lowStockItems.slice(0, 5).map(i => (
                <div key={i.id} className="flex items-center justify-between p-2 rounded-lg bg-white border border-amber-100 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-900">{i.name}</span>
                    <span className={cn(
                      "text-[10px] font-bold",
                      i.stock < 10 ? "text-rose-600" : "text-amber-600"
                    )}>
                      {i.stock} units left
                    </span>
                  </div>
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-100">
                    <div 
                      className={cn(
                        "h-full transition-all duration-500",
                        i.stock < 10 ? "bg-rose-500" : "bg-amber-500"
                      )} 
                      style={{ width: `${Math.min(100, (i.stock / 50) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="flex items-center gap-3 text-emerald-600 mb-2">
              <TrendingUp size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">High Demand</span>
            </div>
            <p className="text-[11px] leading-relaxed text-emerald-900/70">South India Special items are seeing a 25% surge in orders today.</p>
          </div>
        </div>
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-bold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] shadow-md shadow-zinc-200">
          View Full Inventory
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
