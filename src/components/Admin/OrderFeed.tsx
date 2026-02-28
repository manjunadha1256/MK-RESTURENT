/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle, 
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../Shared/GlassCard';
import { Order } from '../../data/mockData';

export const OrderFeed: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'All'>('All');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 className="text-emerald-500" size={18} />;
      case 'Pending': return <Clock className="text-amber-500" size={18} />;
      case 'Preparing': return <Clock className="text-blue-500" size={18} />;
      case 'Out for Delivery': return <Truck className="text-indigo-500" size={18} />;
      case 'Cancelled': return <XCircle className="text-rose-500" size={18} />;
    }
  };

  const getStatusBg = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Preparing': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Out for Delivery': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 flex flex-col h-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-zinc-900">Live Order Feed</h3>
          <p className="text-sm text-zinc-500">Monitor and manage incoming orders in real-time</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input 
              type="text" 
              placeholder="Search ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm text-zinc-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all w-full sm:w-48"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 px-4 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none transition-all"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
            <ShoppingBag size={48} className="mb-4 opacity-10" />
            <p className="font-medium">No orders found</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div 
              key={order.id}
              className="group flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50/30 p-4 transition-all hover:border-emerald-200 hover:bg-emerald-50/20"
            >
              <div className="flex items-center gap-4">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl border shadow-sm", getStatusBg(order.status))}>
                  {getStatusIcon(order.status)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-900">{order.id}</span>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{format(new Date(order.timestamp), 'hh:mm a')}</span>
                  </div>
                  <p className="text-xs font-medium text-zinc-500 mt-0.5">{order.items.length} items • ₹{order.total.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden md:flex flex-col items-end">
                  <span className={cn("rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest border", getStatusBg(order.status))}>
                    {order.status}
                  </span>
                  <span className="mt-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{order.paymentMethod} • {order.paymentStatus}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                    className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-[10px] font-bold text-zinc-700 focus:outline-none focus:border-emerald-500 transition-all shadow-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button className="rounded-xl p-2.5 text-zinc-400 hover:bg-white hover:text-zinc-900 transition-all border border-transparent hover:border-zinc-200 shadow-sm">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

import { ShoppingBag } from 'lucide-react';
