import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
  light = false,
}) => {
  const alignment = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={clsx('flex flex-col max-w-2xl mb-12', alignment[align], className)}
    >
      {badge && (
        <motion.span
          variants={itemVariants}
          className={clsx(
            'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] mb-4',
            light
              ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] border border-rose-400/50'
              : 'bg-brand-50 text-brand-700 border border-brand-200 shadow-sm'
          )}
        >
          {badge}
        </motion.span>
      )}

      <motion.h2
        variants={itemVariants}
        className={clsx(
          'text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]',
          light ? 'text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-400 drop-shadow-sm' : 'text-slate-900'
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={clsx(
            'mt-3 text-base sm:text-lg leading-relaxed',
            light ? 'text-slate-300' : 'text-slate-600'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
