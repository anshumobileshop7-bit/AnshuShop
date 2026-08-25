import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { useShop } from '../context/ShopContext';

const AboutSection = () => {
  const { about } = useShop();

  const title = about?.title || 'Your Trusted Mobile Store';
  const subtitle =
    about?.subtitle ||
    'Serving our community with 100% genuine smartphones, honest pricing & dependable after-sales care since 2018.';
  const description =
    about?.description ||
    'At Anshu Mobile World, we believe buying a phone should be exciting, transparent, and completely worry-free. Whether you are looking for the latest 5G flagship, a reliable budget device, easy EMI financing, or original accessories, our knowledgeable team is here to guide you with genuine recommendations suited for your exact needs.';
  const image =
    about?.image ||
    'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80';

  const principles = [
    { label: 'Good Products', desc: '100% genuine & brand sealed' },
    { label: 'Fair Prices', desc: 'Best local rates & deals' },
    { label: 'Reliable Service', desc: 'Free setup & instant warranty support' },
    { label: 'Happy Customers', desc: '10,000+ satisfied buyers' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-100/50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <SectionHeading
              badge="About Our Store"
              title={title}
              subtitle={subtitle}
              align="left"
              className="mb-6"
            />

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mb-8">
              {description}
            </p>

            {/* 4 Core Pillars */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10"
            >
              {principles.map((p) => (
                <motion.div
                  key={p.label}
                  variants={itemVariants}
                  className="group p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-brand-300 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                      <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                      {p.label}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">{p.desc}</span>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-wrap items-center gap-4">
              <Button to="/contact" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Visit Our Store
              </Button>
            </div>
          </motion.div>

          {/* Shop Image with Overlay Badges */}
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200 border-[8px] border-white bg-slate-900 aspect-[4/3] group">
              <img
                src={image}
                alt={title}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/800x600/f8fafc/64748b?text=Store+Photo';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
