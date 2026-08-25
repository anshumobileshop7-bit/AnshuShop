import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, MessageSquare, ArrowUpRight, Flame } from 'lucide-react';
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

  const waNumber = getCleanWhatsApp(settings.whatsapp);
  const whatsappUrl =
    offer.ctaLink && offer.ctaLink.startsWith('http')
      ? offer.ctaLink
      : `https://wa.me/${waNumber}?text=${encodeURIComponent(defaultWaMessage)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
      className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500 flex flex-col h-full hover:-translate-y-2 relative"
    >
      {/* Image & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={offer.image}
          alt={offer.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          <span className="px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest bg-slate-900/90 backdrop-blur-md text-white shadow-lg">
            {offer.category || 'Special Deal'}
          </span>
          {offer.isFeatured && (
            <span className="px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest bg-amber-500 text-white flex items-center gap-1 shadow-lg">
              <Flame className="w-3.5 h-3.5" /> Hot
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {discountPercent && (
          <div className="absolute top-4 right-4 bg-rose-500 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-lg shadow-rose-500/30">
            {discountPercent}% OFF
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Tags */}
          {offer.tags && offer.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {offer.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-bold tracking-wide uppercase text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-100"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
            {offer.title}
          </h3>

          <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-3 font-medium">
            {offer.description}
          </p>
        </div>

        {/* Price & Action Section */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          {(offer.offerPrice !== null || offer.originalPrice !== null) && (
            <div className="flex items-baseline gap-2 mb-3">
              {offer.offerPrice !== null ? (
                <>
                  <span className="text-2xl font-black text-slate-900">
                    {formatINR(offer.offerPrice)}
                  </span>
                  {offer.originalPrice && offer.originalPrice > offer.offerPrice && (
                    <span className="text-sm font-semibold text-slate-400 line-through">
                      {formatINR(offer.originalPrice)}
                    </span>
                  )}
                </>
              ) : (
                offer.originalPrice && (
                  <span className="text-2xl font-black text-slate-900">
                    {formatINR(offer.originalPrice)}
                  </span>
                )
              )}

              {savingsAmount && (
                <span className="ml-auto text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                  Save {formatINR(savingsAmount)}
                </span>
              )}
            </div>
          )}

          <Button
            href={whatsappUrl}
            variant="whatsapp"
            size="md"
            className="w-full justify-center shadow-none hover:shadow-lg transition-shadow group-hover:bg-[#1ebd5a]"
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
