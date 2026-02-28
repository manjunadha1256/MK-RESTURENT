/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AIOffer } from '../../services/aiService';

interface DynamicOffersBannerProps {
  onAction: (category: string) => void;
}

export const DynamicOffersBanner: React.FC<DynamicOffersBannerProps> = ({ onAction }) => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  
  // Simulated AI-generated offers for the user view
  const aiOffers: AIOffer[] = [
    {
      id: 'ai-1',
      title: 'Lunch Rush Special',
      description: 'Get 25% off on all South India meals. Valid for the next 2 hours!',
      discountCode: 'LUNCH25',
      discountPercentage: 25,
      type: 'Time-based',
      reason: 'High demand detected for lunch items.',
      duration: '2 hours',
      bannerColor: 'bg-emerald-500'
    },
    {
      id: 'ai-2',
      title: 'Weekend Family Feast',
      description: 'Order above ₹1000 and get a free Dessert platter!',
      discountCode: 'FAMILY',
      discountPercentage: 15,
      type: 'Festival-specific',
      reason: 'Weekend trend shows larger group orders.',
      duration: '2 days',
      bannerColor: 'bg-indigo-500'
    },
    {
      id: 'ai-3',
      title: 'Evening Snack Attack',
      description: 'Buy 2 Snacks, Get 1 Tea free. Perfect for your evening break!',
      discountCode: 'SNACKTIME',
      discountPercentage: 20,
      type: 'Time-based',
      reason: 'Afternoon dip in snack sales.',
      duration: '4 hours',
      bannerColor: 'bg-amber-500'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOfferIndex(prev => (prev + 1) % aiOffers.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const offer = aiOffers[currentOfferIndex];

  return (
    <div className="relative overflow-hidden rounded-3xl min-h-[300px] flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={offer.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn("absolute inset-0 p-8 sm:p-12 flex flex-col justify-center", offer.bannerColor)}
        >
          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                <Sparkles size={12} />
                AI Suggested Offer
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                <Clock size={12} />
                Expires in {offer.duration}
              </span>
            </div>
            
            <h1 className="text-4xl font-black text-white sm:text-5xl leading-tight">
              {offer.title}
            </h1>
            <p className="mt-4 text-white/80 text-lg font-medium">
              {offer.description}
            </p>
            
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button 
                onClick={() => onAction('Veg')}
                className="rounded-xl bg-white px-8 py-3.5 font-bold text-zinc-900 transition-all hover:bg-zinc-100 active:scale-95 shadow-xl"
              >
                Claim Offer
              </button>
              <div className="flex items-center gap-2 rounded-xl bg-black/20 px-4 py-3.5 backdrop-blur-md border border-white/10">
                <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Code:</span>
                <span className="text-lg font-mono font-bold text-white tracking-wider">{offer.discountCode}</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-black/10 blur-3xl" />
          <div className="absolute right-10 bottom-10 opacity-20">
            <Zap size={120} className="text-white" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {aiOffers.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentOfferIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              currentOfferIndex === i ? "w-8 bg-white" : "w-2 bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
