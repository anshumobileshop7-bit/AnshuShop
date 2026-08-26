import React, { useState, useEffect } from 'react';
import { ArrowRight, Tag, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import OfferCard from '../components/OfferCard';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';

const categories = ['All', 'Smartphones', 'Accessories', 'Audio', 'EMI Deal', 'Festive Offer'];

const OffersSection = ({ isPreview = false }) => {
  const [offers, setOffers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const params = {};
        if (selectedCategory !== 'All') {
          params.category = selectedCategory;
        }
        if (isPreview) {
          params.featured = 'true';
        }

        const res = await api.get('/offers', { params });
        if (res.data?.success) {
          setOffers(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load offers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [selectedCategory, isPreview]);

  const displayedOffers = isPreview ? offers.slice(0, 3) : offers;

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <SectionHeading
            badge="Exclusive Deals"
            title="Featured Offers & Savings"
            subtitle="Explore our handpicked mobile offers, exchange bonuses and bundle discounts available in store."
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
                to="/offers"
                variant="outline"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
              >
                View All Offers
              </Button>
            </motion.div>
          )}
        </div>

        {/* Category Pills (Shown in full page mode) */}
        {!isPreview && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <LoadingSpinner text="Fetching the latest mobile store offers..." />
        ) : displayedOffers.length === 0 ? (
          <div className="text-center py-16 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <Tag className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No active offers found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {selectedCategory !== 'All'
                ? `There are no active offers in "${selectedCategory}" right now. Check back soon!`
                : 'New exciting mobile offers will be posted shortly. Contact us directly for special quotes!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {displayedOffers.map((offer, index) => (
              <OfferCard key={offer._id || index} offer={offer} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OffersSection;
