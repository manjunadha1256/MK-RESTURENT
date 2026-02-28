/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star, 
  Plus, 
  Minus,
  Heart,
  Clock,
  Flame,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../Shared/GlassCard';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../../data/mockData';

export const CategoryView: React.FC<{ category: MenuItem['category'] | 'All' }> = ({ category }) => {
  const { items, addToCart, cart, removeFromCart, wishlist, toggleWishlist } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search & Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">{category === 'All' ? 'Our Menu' : category}</h2>
          <p className="text-zinc-500">{filteredItems.length} items found</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search treats..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 rounded-xl border border-white/10 bg-zinc-900/50 py-2.5 pl-10 pr-4 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
            />
          </div>
          <button className="rounded-xl border border-white/10 bg-zinc-900/50 p-2.5 text-zinc-400 hover:text-white">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => {
          const cartItem = cart.find(c => c.itemId === item.id);
          const isWishlisted = wishlist.includes(item.id);

          return (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
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
                    className={cn(
                      "absolute right-3 top-3 rounded-full p-2 backdrop-blur-md transition-all shadow-lg",
                      isWishlisted ? "bg-rose-500 text-white shadow-rose-500/20" : "bg-zinc-950/50 text-white hover:bg-rose-500"
                    )}
                  >
                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                      <Star size={10} fill="currentColor" />
                      {item.rating}
                    </span>
                    {item.salesCount > 300 && (
                      <span className="flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                        <Flame size={10} fill="currentColor" />
                        Bestseller
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-white group-hover:text-emerald-500 transition-colors">{item.name}</h3>
                    <span className="text-lg font-bold text-emerald-500">₹{item.price}</span>
                  </div>
                  <p className="mb-6 text-xs text-zinc-500 line-clamp-2">{item.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                      <Clock size={12} />
                      15-20 mins
                    </div>
                    
                    {cartItem ? (
                      <div className="flex items-center gap-3 rounded-xl bg-zinc-800 p-1">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-700 text-white hover:bg-zinc-600 active:scale-90 transition-transform"
                        >
                          <Minus size={16} />
                        </button>
                        <AnimatePresence mode="wait">
                          <motion.span 
                            key={cartItem.quantity}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            className="w-4 text-center text-sm font-bold text-white"
                          >
                            {cartItem.quantity}
                          </motion.span>
                        </AnimatePresence>
                        <button 
                          onClick={() => addToCart(item.id)}
                          className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 active:scale-90 transition-transform"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <motion.button 
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(item.id)}
                          disabled={item.stock === 0}
                          className={cn(
                            "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all",
                            item.stock === 0 
                              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                              : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
                          )}
                        >
                          {item.stock === 0 ? 'Out of Stock' : (
                            <>
                              <Plus size={16} />
                              Add to Cart
                            </>
                          )}
                        </motion.button>
                        
                        {/* Flying Particle Effect */}
                        <AnimatePresence>
                          {cart.find(c => c.itemId === item.id) && (
                            <motion.div
                              initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                              animate={{ 
                                scale: 0.2, 
                                x: 200, 
                                y: -400, 
                                opacity: 0 
                              }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                            >
                              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                                <ShoppingBag size={14} className="text-white" />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
