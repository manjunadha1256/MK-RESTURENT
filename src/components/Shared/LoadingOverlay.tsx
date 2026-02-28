/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';

export const LoadingOverlay: React.FC<{ message?: string }> = ({ message = 'Updating content...' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/60 backdrop-blur-sm rounded-2xl"
    >
      <RefreshCw className="h-8 w-8 animate-spin text-emerald-500" />
      <p className="mt-4 text-sm font-medium text-zinc-300">{message}</p>
    </motion.div>
  );
};
