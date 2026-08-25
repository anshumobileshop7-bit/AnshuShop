import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Button from '../components/Button';

const HeroSection = () => {
  const { hero, getCleanWhatsApp } = useShop();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = hero?.slides || [];
  
  useEffect(() => {
    if (slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];
  
  // Default fallback link if buttonLink is not provided
  const fallbackWaLink = `https://wa.me/${getCleanWhatsApp()}?text=Hi%20Anshu%20Mobile%20World,%20I%20am%20interested%20in%20your%20offers.`;
  const linkUrl = currentSlide?.buttonLink || fallbackWaLink;

  return (
    <section className="w-full bg-white pt-20 sm:pt-24 pb-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/7] md:aspect-[21/9] lg:aspect-[24/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 bg-slate-900 group">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background Image */}
              <img
                src={currentSlide.image}
                alt={currentSlide.heading || `Slide ${currentIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              
              {/* Gradient Overlay for text readability */}
              {(currentSlide.heading || currentSlide.subheading) && (
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
              )}

              {/* Text Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="px-6 sm:px-12 md:px-16 w-full max-w-3xl">
                  {currentSlide.heading && (
                    <motion.h1
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-4 sm:mb-5 drop-shadow-lg tracking-tight"
                    >
                      {currentSlide.heading}
                    </motion.h1>
                  )}
                  
                  {currentSlide.subheading && (
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-sm sm:text-lg md:text-xl text-slate-200 mb-6 sm:mb-8 font-medium max-w-2xl drop-shadow leading-relaxed"
                    >
                      {currentSlide.subheading}
                    </motion.p>
                  )}

                  {currentSlide.buttonText && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      <Button
                        href={linkUrl}
                        variant="primary"
                        size="lg"
                        icon={ArrowRight}
                        iconPosition="right"
                        className="shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 rounded-full px-8 py-3.5 sm:py-4 sm:px-10 font-bold text-sm sm:text-base transition-all hover:scale-105"
                      >
                        {currentSlide.buttonText}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {slides.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 text-slate-700 hover:text-slate-900 bg-white/70 hover:bg-white rounded-full shadow-md backdrop-blur-md transition-all opacity-0 md:opacity-100 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 text-slate-700 hover:text-slate-900 bg-white/70 hover:bg-white rounded-full shadow-md backdrop-blur-md transition-all opacity-0 md:opacity-100 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
              </button>

              {/* Slider Dots */}
              <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
                {slides.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'bg-white scale-125 shadow-sm' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
