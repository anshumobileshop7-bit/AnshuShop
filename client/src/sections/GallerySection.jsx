import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, ArrowRight, Image as ImageIcon } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import LightboxModal from '../components/LightboxModal';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';

const categories = ['All', 'Store Interior', 'New Stock', 'Accessories Zone', 'Customer Moments'];

const GallerySection = ({ isPreview = false }) => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const params = selectedCategory !== 'All' ? { category: selectedCategory } : {};
        const res = await api.get('/gallery', { params });
        if (res.data?.success) {
          setImages(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load gallery images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [selectedCategory]);

  const displayedImages = isPreview ? images.slice(0, 6) : images;

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : displayedImages.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < displayedImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <SectionHeading
            badge="Store Experience"
            title="Take a Look Inside Our Store"
            subtitle="Explore our live smartphone demo counters, wide accessories displays, and friendly store environment."
            align="left"
            className="mb-0"
          />

          {isPreview && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="shrink-0 self-start md:self-auto"
            >
              <Button
                to="/gallery"
                variant="outline"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
              >
                View Full Gallery
              </Button>
            </motion.div>
          )}
        </div>

        {/* Category Filter Pills (Shown on full page) */}
        {!isPreview && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <LoadingSpinner text="Loading shop gallery photos..." />
        ) : displayedImages.length === 0 ? (
          <div className="text-center py-16 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No shop photos available</h3>
            <p className="text-sm text-slate-500 mt-1">Photos will appear here once uploaded by the admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedImages.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                onClick={() => openLightbox(index)}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 cursor-pointer border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <img
                  src={item.image}
                  alt={item.caption || 'Anshu Mobile World photo'}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/600x400/1e293b/64748b?text=Image+Unavailable';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    {item.category && (
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-brand-600 text-white mb-2">
                        {item.category}
                      </span>
                    )}
                    {item.caption && (
                      <p className="text-sm text-white font-medium leading-snug line-clamp-2">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        images={displayedImages}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};

export default GallerySection;
