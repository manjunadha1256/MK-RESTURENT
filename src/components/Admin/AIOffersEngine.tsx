/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Calendar, 
  Zap,
  ChevronRight,
  BarChart3,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../Shared/GlassCard';
import { generateAIOffers, AIOffer } from '../../services/aiService';
import { motion, AnimatePresence } from 'motion/react';

export const AIOffersEngine: React.FC = () => {
  const { orders, items, feedback } = useApp();
  const [offers, setOffers] = useState<AIOffer[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeOffers, setActiveOffers] = useState<string[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const newOffers = await generateAIOffers(orders, items, feedback);
    setOffers(newOffers);
    setIsGenerating(false);
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  const toggleOffer = (id: string) => {
    setActiveOffers(prev => 
      prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
            <Sparkles className="text-amber-500" />
            AI Offers Engine
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Intelligent sales analysis & automated campaign generation</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-xl shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-95 disabled:opacity-50"
        >
          {isGenerating ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
          {isGenerating ? 'Analyzing Data...' : 'Generate New Offers'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* AI Analysis Summary */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">AI Insights Summary</h3>
            <p className="text-sm text-zinc-500">Real-time business intelligence</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-2xl bg-zinc-50 p-4 border border-zinc-100">
              <div className="rounded-xl bg-blue-100 p-2.5 text-blue-600 shadow-sm">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Peak Demand</p>
                <p className="text-sm text-zinc-700 font-medium mt-1 leading-relaxed">Lunch hours (12 PM - 2 PM) show 45% higher volume in South India category.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl bg-zinc-50 p-4 border border-zinc-100">
              <div className="rounded-xl bg-amber-100 p-2.5 text-amber-600 shadow-sm">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Time-Based Trend</p>
                <p className="text-sm text-zinc-700 font-medium mt-1 leading-relaxed">Tea & Snacks sales drop by 30% on weekdays after 6 PM. Opportunity for evening combos.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl bg-zinc-50 p-4 border border-zinc-100">
              <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600 shadow-sm">
                <BarChart3 size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Customer Sentiment</p>
                <p className="text-sm text-zinc-700 font-medium mt-1 leading-relaxed">Feedback indicates high satisfaction with "North India" but price sensitivity on "Desserts".</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-zinc-100">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest mb-3">
              <span className="text-zinc-400">Campaign Efficiency</span>
              <span className="text-emerald-600">+18.4%</span>
            </div>
            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[72%]" />
            </div>
          </div>
        </div>

        {/* Suggested Offers */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-zinc-900">Suggested Campaigns</h3>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">AI Generated • {offers.length} Suggestions</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {offers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={cn(
                    "group relative overflow-hidden rounded-2xl border p-6 transition-all shadow-sm",
                    activeOffers.includes(offer.id) 
                      ? "border-emerald-200 bg-emerald-50/30" 
                      : "border-zinc-100 bg-white hover:border-emerald-200 hover:shadow-md"
                  )}>
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={cn(
                            "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest border",
                            offer.type === 'Personalized' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            offer.type === 'Time-based' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                            'bg-purple-50 text-purple-600 border-purple-100'
                          )}>
                            {offer.type}
                          </span>
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Clock size={12} /> {offer.duration}
                          </span>
                        </div>
                        <h4 className="text-xl font-black text-zinc-900">{offer.title}</h4>
                        <p className="text-sm font-medium text-zinc-500 mt-1.5 leading-relaxed">{offer.description}</p>
                        
                        <div className="mt-6 flex flex-wrap items-center gap-4">
                          <div className="rounded-xl bg-zinc-50 px-4 py-2 border border-zinc-100 shadow-sm">
                            <span className="text-[10px] text-zinc-400 uppercase font-black block tracking-widest">Code</span>
                            <span className="text-sm font-mono font-bold text-emerald-600 tracking-wider">{offer.discountCode}</span>
                          </div>
                          <div className="rounded-xl bg-zinc-50 px-4 py-2 border border-zinc-100 shadow-sm">
                            <span className="text-[10px] text-zinc-400 uppercase font-black block tracking-widest">Discount</span>
                            <span className="text-sm font-black text-zinc-900">{offer.discountPercentage}% OFF</span>
                          </div>
                        </div>

                        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-zinc-50/50 p-4 border border-zinc-100">
                          <Sparkles className="text-amber-500 shrink-0" size={16} />
                          <p className="text-[11px] leading-relaxed text-zinc-600 italic">
                            <span className="text-zinc-900 font-black not-italic uppercase tracking-widest mr-1">AI Reasoning:</span> {offer.reason}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-center">
                        <button 
                          onClick={() => toggleOffer(offer.id)}
                          className={cn(
                            "flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-black uppercase tracking-widest transition-all shadow-lg",
                            activeOffers.includes(offer.id)
                              ? "bg-emerald-600 text-white shadow-emerald-600/20"
                              : "bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-900/10"
                          )}
                        >
                          {activeOffers.includes(offer.id) ? (
                            <>
                              <CheckCircle2 size={18} />
                              Active
                            </>
                          ) : (
                            <>
                              <Zap size={18} />
                              Activate
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Background Glow */}
                    <div className={cn(
                      "absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl opacity-5 transition-all",
                      offer.bannerColor || 'bg-emerald-500'
                    )} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
