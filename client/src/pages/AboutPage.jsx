import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, PhoneCall, Mail } from 'lucide-react';
import AboutSection from '../sections/AboutSection';
import StatsSection from '../sections/StatsSection';
import WhyChooseUs from '../sections/WhyChooseUs';
import GallerySection from '../sections/GallerySection';
import { useShop } from '../context/ShopContext';

const AboutPage = () => {
  const { settings } = useShop();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* Premium Page Header */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-900 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-brand-600/30 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            <span className="text-sm font-bold text-white tracking-widest uppercase">Since 2018</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6"
          >
            Our Story & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">Mission</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 font-medium leading-relaxed"
          >
            We started with a simple vision: to bring the best mobile technology to our local community with 100% transparency, unbeatable prices, and genuine care.
          </motion.p>
        </div>
      </div>

      {/* Main Sections */}
      <div className="-mt-10 relative z-20">
        <AboutSection />
      </div>

      <div className="py-10">
        <StatsSection />
      </div>

      <div className="py-10">
        <WhyChooseUs />
      </div>

      <GallerySection isPreview={false} />

      {/* Quick Contact Bar for About Page */}
      <section className="py-16 bg-brand-50 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-brand-500/5 border border-brand-100 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Visit Anshu Mobile World Today</h3>
              <p className="text-slate-600">Experience premium service and the best deals in town.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <a href={`tel:${settings?.phone}`} className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Call Us</p>
                  <p className="text-sm font-semibold text-slate-900">{settings?.phone}</p>
                </div>
              </a>

              <a href={settings?.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Location</p>
                  <p className="text-sm font-semibold text-slate-900">Get Directions</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
