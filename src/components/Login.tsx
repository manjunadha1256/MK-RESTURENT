/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { User, ShieldCheck, Utensils } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Login: React.FC = () => {
  const { login } = useApp();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500 shadow-2xl shadow-emerald-500/20">
            <Utensils size={40} className="text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Choose your portal to continue
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => login('admin')}
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/5"
          >
            <div className="mb-4 rounded-full bg-zinc-800 p-4 transition-colors group-hover:bg-emerald-500/20 group-hover:text-emerald-500">
              <ShieldCheck size={32} />
            </div>
            <span className="text-lg font-semibold text-white">Admin Portal</span>
            <span className="mt-1 text-xs text-zinc-500">Manage Business</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => login('user')}
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/5"
          >
            <div className="mb-4 rounded-full bg-zinc-800 p-4 transition-colors group-hover:bg-emerald-500/20 group-hover:text-emerald-500">
              <User size={32} />
            </div>
            <span className="text-lg font-semibold text-white">User Portal</span>
            <span className="mt-1 text-xs text-zinc-500">Order Treats</span>
          </motion.button>
        </div>

        <p className="text-center text-xs text-zinc-600">
          MK Traditional Treats &copy; 2026. All rights reserved.
        </p>
      </div>
    </div>
  );
};
