import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Sparkles, Server } from 'lucide-react';

const ColdStartLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-600/20 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        
        {/* Animated Icon Cluster */}
        <div className="relative mb-8 w-24 h-24">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-tr from-brand-600 to-blue-500 rounded-2xl shadow-2xl shadow-brand-500/40 flex items-center justify-center z-10"
          >
            <Smartphone className="w-10 h-10 text-white" strokeWidth={1.5} />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-4 -right-4 w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-3 -left-3 w-12 h-12 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center shadow-lg z-20"
          >
            <Server className="w-6 h-6 text-brand-400" />
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3"
        >
          Waking up our servers...
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 font-medium"
        >
          Anshu Mobile World is hosted on a sleep-enabled eco-server. Please give us up to <strong className="text-white">50 seconds</strong> to prepare the latest smartphones and exclusive offers for you.
        </motion.p>

        {/* Custom Progress Bar Indicator */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 45, ease: "linear" }}
            className="h-full bg-gradient-to-r from-brand-500 to-blue-500 rounded-full"
          />
        </div>
        <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-4 font-bold animate-pulse">
          Establishing Secure Connection
        </p>

      </div>
    </div>
  );
};

export default ColdStartLoader;
