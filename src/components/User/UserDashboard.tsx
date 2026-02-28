/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Utensils, 
  ShoppingBag, 
  History, 
  MessageSquare, 
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Coffee,
  Leaf,
  Beef,
  Pizza,
  Map,
  MapPin,
  Clock,
  ChevronRight,
  Flame
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CategoryView } from './CategoryView';
import { Cart, Payment } from './Cart';
import { OrderHistory } from './OrderHistory';
import { FeedbackForm } from './FeedbackForm';
import { WishlistView } from './WishlistView';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../../data/mockData';
import { Heart } from 'lucide-react';
import { DynamicOffersBanner } from './DynamicOffersBanner';
import { LoadingOverlay } from '../Shared/LoadingOverlay';

export const UserDashboard: React.FC = () => {
  const { logout, cart, wishlist, isLoading, setLoading } = useApp();
  const [activeTab, setActiveTab] = useState<MenuItem['category'] | 'Overview' | 'Cart' | 'History' | 'Feedback' | 'Wishlist'>('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleTabChange = (tab: any) => {
    setLoading(true);
    setActiveTab(tab);
    setIsCheckingOut(false);
    setTimeout(() => setLoading(false), 600);
  };

  const categories: { name: MenuItem['category']; icon: any }[] = [
    { name: 'Veg', icon: Leaf },
    { name: 'Non-Veg', icon: Beef },
    { name: 'Snacks', icon: Pizza },
    { name: 'Tea', icon: Coffee },
    { name: 'Coffee', icon: Coffee },
    { name: 'North India', icon: MapPin },
    { name: 'South India', icon: MapPin },
  ];

  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard },
    ...categories,
    { name: 'Wishlist', icon: Heart, count: wishlist.length },
    { name: 'Cart', icon: ShoppingBag, count: cart.length },
    { name: 'History', icon: History },
    { name: 'Feedback', icon: MessageSquare },
  ];

  const renderContent = () => {
    if (isLoading) return <div className="h-96 relative"><LoadingOverlay /></div>;

    if (isCheckingOut) {
      return (
        <Payment 
          onComplete={() => {
            setIsCheckingOut(false);
            handleTabChange('History');
          }} 
          onCancel={() => setIsCheckingOut(false)} 
        />
      );
    }

    switch (activeTab) {
      case 'Overview':
        return (
          <div className="space-y-12">
            {/* AI-Driven Dynamic Hero Banner */}
            <DynamicOffersBanner onAction={handleTabChange} />

            {/* Quick Categories */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleTabChange(cat.name)}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-zinc-900/50 p-6 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400 transition-all group-hover:bg-emerald-500 group-hover:text-white">
                    <cat.icon size={24} />
                  </div>
                  <span className="text-xs font-bold text-zinc-400 group-hover:text-white">{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Featured Section */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Popular Right Now</h3>
                <button className="flex items-center gap-2 text-sm text-emerald-500 font-bold hover:underline">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <CategoryView category="All" />
            </div>
          </div>
        );
      case 'Cart':
        return <Cart onCheckout={() => setIsCheckingOut(true)} />;
      case 'History':
        return <OrderHistory />;
      case 'Feedback':
        return <FeedbackForm />;
      case 'Wishlist':
        return <WishlistView />;
      case 'Veg':
      case 'Non-Veg':
      case 'Snacks':
      case 'Tea':
      case 'Coffee':
      case 'North India':
      case 'South India':
        return <CategoryView category={activeTab} />;
      default:
        return <div className="text-white">Coming Soon...</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/5 bg-zinc-900/50 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
              <Utensils className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">MK Treats</h1>
              <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Smart Business</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  handleTabChange(item.name as any);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  activeTab === item.name 
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={20} />
                <span className="flex-1 text-left">{item.name}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <button 
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-rose-500 transition-all hover:bg-rose-500/10"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/5 bg-zinc-950/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-xl font-bold text-white">{isCheckingOut ? 'Checkout' : activeTab}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                placeholder="Search treats..." 
                className="w-64 rounded-xl border border-white/10 bg-zinc-900/50 py-2.5 pl-10 pr-4 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
              />
            </div>
            
            <button 
              onClick={() => handleTabChange('Cart')}
              className="relative rounded-xl border border-white/10 bg-zinc-900/50 p-2.5 text-zinc-400 transition-all hover:border-white/20 hover:text-white"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {cart.length > 0 && (
                  <motion.span 
                    key="cart-badge"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-lg shadow-emerald-500/20"
                  >
                    <motion.span
                      key={cart.length}
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="inline-block"
                    >
                      {cart.length}
                    </motion.span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white">John Doe</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Premium Member</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                <LayoutDashboard size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (isCheckingOut ? '-checkout' : '')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
