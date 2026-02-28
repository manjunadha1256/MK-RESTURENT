/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  ShoppingBag, 
  Users, 
  Package, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  PieChart as PieChartIcon,
  MessageSquare,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatsCards } from './StatsCards';
import { AnalyticsCharts } from './AnalyticsCharts';
import { OrderFeed } from './OrderFeed';
import { InventoryMonitor } from './InventoryMonitor';
import { WorkerManagement } from './WorkerManagement';
import { FeedbackAnalytics } from './FeedbackAnalytics';
import { AIOffersEngine } from './AIOffersEngine';
import { motion, AnimatePresence } from 'motion/react';
import { LoadingOverlay } from '../Shared/LoadingOverlay';

export const AdminDashboard: React.FC = () => {
  const { logout, user, isLoading, setLoading } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleTabChange = (tab: string) => {
    setLoading(true);
    setActiveTab(tab);
    setTimeout(() => setLoading(false), 800);
  };

  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Orders', icon: ShoppingBag },
    { name: 'Inventory', icon: Package },
    { name: 'Staff', icon: Users },
    { name: 'AI Offers', icon: Sparkles },
    { name: 'Feedback', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="space-y-8">
            <StatsCards />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 relative">
                {isLoading && <LoadingOverlay message="Updating charts..." />}
                <AnalyticsCharts />
              </div>
              <div className="lg:col-span-1 relative">
                {isLoading && <LoadingOverlay message="Updating orders..." />}
                <OrderFeed />
              </div>
            </div>
            <div className="relative">
              {isLoading && <LoadingOverlay message="Updating inventory..." />}
              <InventoryMonitor />
            </div>
            <div className="relative">
              {isLoading && <LoadingOverlay message="Updating staff..." />}
              <WorkerManagement />
            </div>
            <div className="relative">
              {isLoading && <LoadingOverlay message="Updating feedback..." />}
              <FeedbackAnalytics />
            </div>
          </div>
        );
      case 'Analytics':
        return <AnalyticsCharts />;
      case 'Orders':
        return <OrderFeed />;
      case 'Inventory':
        return <InventoryMonitor />;
      case 'Staff':
        return <WorkerManagement />;
      case 'AI Offers':
        return <AIOffersEngine />;
      case 'Feedback':
        return <FeedbackAnalytics />;
      default:
        return <div className="text-white">Coming Soon...</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-zinc-200 bg-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-600/20">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-zinc-900">MK Treats</h1>
              <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-black">Admin Portal</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleTabChange(item.name)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all",
                  activeTab === item.name 
                    ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20" 
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                )}
              >
                <item.icon size={20} />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-2">
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900">
              <Settings size={20} />
              Settings
            </button>
            <button 
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-rose-600 transition-all hover:bg-rose-50 hover:text-rose-700"
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
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-zinc-200 bg-white/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden rounded-xl p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-xl font-black text-zinc-900">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => handleTabChange(activeTab)}
              className="hidden sm:flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-zinc-500 transition-all hover:border-zinc-300 hover:text-zinc-900 shadow-sm"
            >
              <RefreshCw size={14} className={cn(isLoading && "animate-spin")} />
              Refresh Data
            </button>

            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder="Search analytics..." 
                className="w-64 rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm text-zinc-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>
            
            <button className="relative rounded-xl border border-zinc-200 bg-white p-2.5 text-zinc-500 transition-all hover:border-zinc-300 hover:text-zinc-900 shadow-sm">
              <Bell size={20} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-emerald-500 border-2 border-white" />
            </button>

            <div className="flex items-center gap-3 border-l border-zinc-200 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-zinc-900">Admin User</p>
                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Super Admin</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-zinc-100 p-0.5 border border-zinc-200 shadow-sm">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                  <Users size={20} className="text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
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
