/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  History, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle,
  Package,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../Shared/GlassCard';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../../data/mockData';

export const OrderHistory: React.FC = () => {
  const { orders, user, items } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const userOrders = orders.filter(o => o.userId === user?.id);

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
      case 'Delivered': return 'bg-emerald-500/10 text-emerald-500';
      case 'Pending': return 'bg-amber-500/10 text-amber-500';
      case 'Preparing': return 'bg-blue-500/10 text-blue-500';
      case 'Out for Delivery': return 'bg-indigo-500/10 text-indigo-500';
      case 'Cancelled': return 'bg-rose-500/10 text-rose-500';
    }
  };

  if (userOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500">
        <div className="mb-6 rounded-full bg-zinc-900 p-8">
          <History size={64} className="opacity-20" />
        </div>
        <h3 className="text-xl font-bold text-white">No order history</h3>
        <p className="mt-2 text-sm">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Orders List */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-xl font-bold text-white mb-6">Your Orders</h3>
        <div className="space-y-3">
          {userOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl border p-4 transition-all text-left",
                selectedOrder?.id === order.id 
                  ? "border-emerald-500 bg-emerald-500/5" 
                  : "border-white/5 bg-zinc-900/50 hover:border-white/10"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", getStatusBg(order.status))}>
                  {getStatusIcon(order.status)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{order.id}</span>
                    <span className="text-xs text-zinc-500">• {format(new Date(order.timestamp), 'MMM dd, yyyy')}</span>
                  </div>
                  <p className="text-xs text-zinc-400">{order.items.length} items • ₹{order.total.toLocaleString()}</p>
                </div>
              </div>
              <ChevronRight size={20} className={cn("text-zinc-500 transition-transform", selectedOrder?.id === order.id && "rotate-90")} />
            </button>
          ))}
        </div>
      </div>

      {/* Order Details */}
      <div className="lg:col-span-1">
        <AnimatePresence mode="wait">
          {selectedOrder ? (
            <motion.div
              key={selectedOrder.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassCard className="sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white">Order Details</h4>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", getStatusBg(selectedOrder.status))}>
                    {selectedOrder.status}
                  </span>
                </div>

                <div className="space-y-4 border-b border-white/5 pb-6">
                  {selectedOrder.items.map((orderItem, i) => {
                    const item = items.find(it => it.id === orderItem.itemId);
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 overflow-hidden">
                          {item ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" /> : <Package size={20} />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{item?.name || 'Unknown Item'}</p>
                          <p className="text-xs text-zinc-500">Qty: {orderItem.quantity} • ₹{orderItem.price}</p>
                        </div>
                        <p className="text-sm font-bold text-white">₹{(orderItem.price * orderItem.quantity).toLocaleString()}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Payment Method</span>
                    <span className="text-white font-medium">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Payment Status</span>
                    <span className="text-emerald-500 font-medium">{selectedOrder.paymentStatus}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-white pt-4">
                    <span>Total</span>
                    <span className="text-emerald-500">₹{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>

                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-800 py-3 text-sm font-bold text-white transition-all hover:bg-zinc-700">
                  <ExternalLink size={16} />
                  Download Invoice
                </button>
              </GlassCard>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 rounded-2xl border border-dashed border-white/10 text-zinc-500">
              <Package size={48} className="mb-4 opacity-20" />
              <p className="text-sm">Select an order to view details</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
