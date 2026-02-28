/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Plus,
  ArrowRight,
  Utensils
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../Shared/GlassCard';
import { motion, AnimatePresence } from 'motion/react';

export const WishlistView: React.FC = () => {
  const { wishlist, items, addToCart, toggleWishlist } = useApp();

  const wishlistItems = items.filter(item => wishlist.includes(item.id));

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500">
        <div className="mb-6 rounded-full bg-zinc-900 p-8">
          <Heart size={64} className="opacity-20" />
        </div>
        <h3 className="text-xl font-bold text-white">Your wishlist is empty</h3>
        <p className="mt-2 text-sm">Save your favorite treats for later!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">My Wishlist ({wishlistItems.length})</h3>
        <button 
          onClick={() => wishlistItems.forEach(item => toggleWishlist(item.id))}
          className="text-sm text-rose-500 hover:text-rose-400 transition-colors"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence>
          {wishlistItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="group flex flex-col h-full p-0 overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                  <button 
                    onClick={() => toggleWishlist(item.id)}
                    className="absolute right-3 top-3 rounded-full bg-rose-500 p-2 text-white backdrop-blur-md transition-colors shadow-lg shadow-rose-500/20"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <span className="text-lg font-bold text-emerald-500">₹{item.price}</span>
                  </div>
                  <p className="mb-6 text-xs text-zinc-500 line-clamp-2">{item.description}</p>
                  
                  <div className="mt-auto flex items-center gap-2">
                    <button 
                      onClick={() => addToCart(item.id)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-95"
                    >
                      <Plus size={18} />
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => toggleWishlist(item.id)}
                      className="rounded-xl border border-white/5 bg-zinc-800 p-3 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
