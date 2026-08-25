import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const LightboxModal = ({
  isOpen,
  images = [],
  currentIndex = 0,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !images.length) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between text-white/80 pb-4">
            <span className="text-sm font-medium tracking-wide">
              {currentIndex + 1} / {images.length}
            </span>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image View */}
          <div className="relative w-full flex items-center justify-center min-h-[50vh] max-h-[75vh]">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={currentImage?.image}
              alt={currentImage?.caption || 'Shop Gallery'}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />

            {/* Left Nav */}
            {images.length > 1 && (
              <button
                onClick={onPrev}
                className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Right Nav */}
            {images.length > 1 && (
              <button
                onClick={onNext}
                className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Caption & Category */}
          {currentImage && (
            <div className="mt-4 text-center text-white max-w-2xl px-4">
              {currentImage.category && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-600/80 text-white mb-2">
                  {currentImage.category}
                </span>
              )}
              {currentImage.caption && (
                <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                  {currentImage.caption}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default LightboxModal;
