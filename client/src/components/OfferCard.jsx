import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Flame } from 'lucide-react';
import Button from './Button';
import { useShop } from '../context/ShopContext';

const formatINR = (num) => {
  if (num === null || num === undefined || isNaN(num)) return null;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
};

const OfferCard = ({ offer, index = 0 }) => {
  const { settings, getCleanWhatsApp } = useShop();

  const discountPercent =
    offer.originalPrice && offer.offerPrice && offer.originalPrice > offer.offerPrice
      ? Math.round(((offer.originalPrice - offer.offerPrice) / offer.originalPrice) * 100)
      : null;

  const savingsAmount =
    offer.originalPrice && offer.offerPrice && offer.originalPrice > offer.offerPrice
      ? offer.originalPrice - offer.offerPrice
      : null;

  // Build WhatsApp inquiry link
  const defaultWaMessage = `Hello Anshu Mobile World, I am interested in this offer: "${offer.title}"${
    offer.offerPrice ? ` priced at ${formatINR(offer.offerPrice)}` : ''
  }. Is it currently available at your store?`;

  const waNumber = getCleanWhatsApp(settings?.whatsapp);
  const whatsappUrl =
    offer.ctaLink && offer.ctaLink.startsWith('http')
      ? offer.ctaLink
      : `https://wa.me/${waNumber}?text=${encodeURIComponent(defaultWaMessage)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col h-full relative"
    >
      {/* 1. Image Container with Auto Cover & Badges */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100 shrink-0">
        <img
          src={offer.image}
          alt={offer.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-Left Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/85 backdrop-blur-md text-white shadow-sm">
            {offer.category || 'Special Deal'}
          </span>
          {offer.isFeatured && (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-white flex items-center gap-1 shadow-sm">
              <Flame className="w-3 h-3" /> Hot
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {discountPercent && (
          <div className="absolute top-3 right-3 bg-rose-500 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md shadow-rose-500/20 z-10">
            {discountPercent}% OFF
          </div>
        )}
      </div>

      {/* 2. Dynamic Content Body (No extra gaps, adapts strictly to text) */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Tags */}
          {offer.tags && offer.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {offer.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-bold tracking-wide uppercase text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-100"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2 mb-1.5">
            {offer.title}
          </h3>

          {/* Description */}
          {offer.description && (
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 font-normal mb-3">
              {offer.description}
            </p>
          )}
        </div>

        {/* 3. Pricing & CTA Button */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          {(offer.offerPrice !== null || offer.originalPrice !== null) && (
            <div className="flex items-baseline justify-between gap-2 mb-3">
              <div className="flex items-baseline gap-2">
                {offer.offerPrice !== null ? (
                  <>
                    <span className="text-xl sm:text-2xl font-black text-slate-900">
                      {formatINR(offer.offerPrice)}
                    </span>
                    {offer.originalPrice && offer.originalPrice > offer.offerPrice && (
                      <span className="text-xs sm:text-sm font-semibold text-slate-400 line-through">
                        {formatINR(offer.originalPrice)}
                      </span>
                    )}
                  </>
                ) : (
                  offer.originalPrice && (
                    <span className="text-xl sm:text-2xl font-black text-slate-900">
                      {formatINR(offer.originalPrice)}
                    </span>
                  )
                )}
              </div>

              {savingsAmount && (
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Save {formatINR(savingsAmount)}
                </span>
              )}
            </div>
          )}

          <Button
            href={whatsappUrl}
            variant="whatsapp"
            size="md"
            className="w-full justify-center py-2.5 sm:py-3 text-sm font-bold shadow-none hover:shadow-lg transition-all rounded-xl group-hover:bg-[#1ebd5a]"
            icon={MessageSquare}
          >
            {offer.ctaText || 'Inquire on WhatsApp'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default OfferCard;
