/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../Shared/GlassCard';
import { motion, AnimatePresence } from 'motion/react';

export const FeedbackForm: React.FC = () => {
  const { submitFeedback } = useApp();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    submitFeedback(rating, comment);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setRating(0);
      setComment('');
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <GlassCard className="space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 shadow-2xl shadow-emerald-500/20">
            <MessageSquare size={32} className="text-white" />
          </div>
          <h3 className="mt-6 text-2xl font-bold text-white">Share Your Experience</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Your feedback helps us improve our treats and service.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="mb-6 rounded-full bg-emerald-500 p-6 shadow-2xl shadow-emerald-500/20">
                <CheckCircle2 size={48} className="text-white" />
              </div>
              <h4 className="text-xl font-bold text-white">Thank You!</h4>
              <p className="mt-2 text-sm text-zinc-400">Your feedback has been submitted successfully.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="space-y-4 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">Rate your experience</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star 
                        size={40} 
                        className={cn(
                          "transition-colors",
                          (hoverRating || rating) >= star ? "fill-emerald-500 text-emerald-500" : "text-zinc-700"
                        )} 
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-zinc-500">
                  {rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : rating === 1 ? 'Poor' : 'Select a rating'}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">Leave a comment</p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you loved or how we can improve..."
                  className="w-full h-32 rounded-2xl border border-white/10 bg-zinc-950/50 p-6 text-sm text-white focus:border-emerald-500/50 focus:outline-none placeholder:text-zinc-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-zinc-900/50 py-4 text-sm font-bold text-zinc-400 transition-all hover:border-white/10 hover:text-white"
                >
                  <ThumbsDown size={18} />
                  Needs Improvement
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-zinc-900/50 py-4 text-sm font-bold text-zinc-400 transition-all hover:border-white/10 hover:text-white"
                >
                  <ThumbsUp size={18} />
                  Loved Everything
                </button>
              </div>

              <button
                type="submit"
                disabled={rating === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Feedback
                <Send size={20} />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </GlassCard>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
