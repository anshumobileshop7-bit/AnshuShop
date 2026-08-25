import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Smartphone, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const splitStatString = (str) => {
  if (!str) return { num: '', text: '' };
  const firstSpace = str.indexOf(' ');
  if (firstSpace === -1) return { num: str, text: '' };
  return {
    num: str.slice(0, firstSpace),
    text: str.slice(firstSpace + 1),
  };
};

const StatsSection = () => {
  const { about } = useShop();

  const rawStats = [
    {
      icon: Award,
      rawString: about?.experienceYears || '7+ Years Experience',
    },
    {
      icon: Users,
      rawString: about?.happyCustomers || '10,000+ Happy Customers',
    },
    {
      icon: Smartphone,
      rawString: about?.smartphonesSold || '15,000+ Devices Delivered',
    },
    {
      icon: ShieldCheck,
      rawString: '100% Genuine Products',
    },
  ];

  return (
    <section className="relative bg-brand-900 text-white py-12 sm:py-20 border-y border-brand-800/50 overflow-hidden">
      {/* Refined Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {rawStats.map((stat, index) => {
            const Icon = stat.icon;
            const { num, text } = splitStatString(stat.rawString);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group flex flex-col items-center justify-center text-center p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-brand-400/30 transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-brand-800 flex items-center justify-center group-hover:bg-brand-500/40 transition-colors duration-300">
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-brand-200 group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-1 sm:mb-2 tracking-tight drop-shadow-sm">
                  {num}
                </h3>
                
                <p className="text-[11px] sm:text-sm font-medium text-brand-200/80 uppercase tracking-wider max-w-[120px] sm:max-w-none leading-snug">
                  {text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
