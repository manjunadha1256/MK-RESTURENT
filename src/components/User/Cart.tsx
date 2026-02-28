/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Ticket,
  CreditCard,
  Smartphone,
  Banknote,
  CheckCircle2,
  Download,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../Shared/GlassCard';
import { motion, AnimatePresence } from 'motion/react';

export const Cart: React.FC<{ onCheckout: () => void }> = ({ onCheckout }) => {
  const { cart, items, addToCart, removeFromCart, clearCart } = useApp();

  const cartItems = cart.map(c => {
    const item = items.find(i => i.id === c.itemId)!;
    return { ...item, quantity: c.quantity };
  });

  const subtotal = cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const gst = subtotal * 0.18;
  const discount = subtotal > 1000 ? subtotal * 0.1 : 0;
  const total = subtotal + gst - discount;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500">
        <div className="mb-6 rounded-full bg-zinc-900 p-8">
          <ShoppingBag size={64} className="opacity-20" />
        </div>
        <h3 className="text-xl font-bold text-white">Your cart is empty</h3>
        <p className="mt-2 text-sm">Add some delicious treats to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Items List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Cart Items ({cart.length})</h3>
          <button 
            onClick={clearCart}
            className="flex items-center gap-2 text-sm text-rose-500 hover:text-rose-400 transition-colors"
          >
            <Trash2 size={16} />
            Clear Cart
          </button>
        </div>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <GlassCard key={item.id} className="flex items-center gap-4 p-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="h-20 w-20 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <h4 className="font-bold text-white">{item.name}</h4>
                <p className="text-xs text-zinc-500">{item.category}</p>
                <p className="mt-1 text-emerald-500 font-bold">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-zinc-800 p-1">
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-700 text-white hover:bg-zinc-600"
                >
                  <Minus size={16} />
                </button>
                <span className="w-4 text-center text-sm font-bold text-white">{item.quantity}</span>
                <button 
                  onClick={() => addToCart(item.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="text-right min-w-[80px]">
                <p className="font-bold text-white">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <GlassCard className="sticky top-24 space-y-6 border-emerald-500/20 bg-emerald-500/5">
          <h3 className="text-xl font-bold text-white">Order Summary</h3>
          
          <div className="space-y-3 border-b border-white/5 pb-6">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Subtotal</span>
              <span className="text-white font-medium">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">GST (18%)</span>
              <span className="text-white font-medium">₹{gst.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-emerald-500">
                <span>Discount (10%)</span>
                <span>-₹{discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-xl bg-zinc-950/50 p-3">
              <Ticket size={16} className="text-emerald-500" />
              <input 
                type="text" 
                placeholder="Promo Code" 
                className="flex-1 bg-transparent text-xs text-white focus:outline-none"
              />
              <button className="text-xs font-bold text-emerald-500 uppercase">Apply</button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-white">Total</span>
            <span className="text-2xl font-bold text-emerald-500">₹{total.toLocaleString()}</span>
          </div>

          <button 
            onClick={onCheckout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-95"
          >
            Proceed to Checkout
            <ArrowRight size={18} />
          </button>

          <p className="text-center text-[10px] text-zinc-500 uppercase tracking-widest">
            Free delivery on orders above ₹500
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export const Payment: React.FC<{ onComplete: () => void; onCancel: () => void }> = ({ onComplete, onCancel }) => {
  const { placeOrder } = useApp();
  const [method, setMethod] = useState<any>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      placeOrder(method);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-[60vh] text-center"
      >
        <div className="mb-6 rounded-full bg-emerald-500 p-8 shadow-2xl shadow-emerald-500/20">
          <CheckCircle2 size={64} className="text-white" />
        </div>
        <h3 className="text-3xl font-bold text-white">Payment Successful!</h3>
        <p className="mt-2 text-zinc-400">Your order has been placed and is being prepared.</p>
        
        <div className="mt-10 flex gap-4">
          <button 
            onClick={onComplete}
            className="rounded-xl bg-emerald-500 px-8 py-3 font-bold text-white transition-all hover:bg-emerald-600"
          >
            Back to Menu
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-8 py-3 font-bold text-white transition-all hover:bg-zinc-800">
            <Download size={18} />
            Invoice
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <GlassCard className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Select Payment Method</h3>
          <button onClick={onCancel} className="text-zinc-500 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {[
            { id: 'UPI', icon: Smartphone, label: 'UPI Payment', desc: 'Google Pay, PhonePe, Paytm' },
            { id: 'Card', icon: CreditCard, label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
            { id: 'Cash', icon: Banknote, label: 'Cash on Delivery', desc: 'Pay when your food arrives' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={cn(
                "flex items-center gap-4 rounded-2xl border p-6 transition-all",
                method === m.id 
                  ? "border-emerald-500 bg-emerald-500/10" 
                  : "border-white/5 bg-zinc-900/50 hover:border-white/10"
              )}
            >
              <div className={cn(
                "rounded-xl p-3",
                method === m.id ? "bg-emerald-500 text-white" : "bg-zinc-800 text-zinc-400"
              )}>
                <m.icon size={24} />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">{m.label}</p>
                <p className="text-xs text-zinc-500">{m.desc}</p>
              </div>
              <div className={cn(
                "ml-auto h-6 w-6 rounded-full border-2 flex items-center justify-center",
                method === m.id ? "border-emerald-500 bg-emerald-500" : "border-zinc-700"
              )}>
                {method === m.id && <div className="h-2 w-2 rounded-full bg-white" />}
              </div>
            </button>
          ))}
        </div>

        <button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-500 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-95 disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              Confirm Payment
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </GlassCard>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
