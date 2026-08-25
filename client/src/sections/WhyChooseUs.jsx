import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  BadgePercent,
  Smartphone,
  CreditCard,
  Headphones,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useShop } from '../context/ShopContext';

const iconMap = {
  ShieldCheck,
  BadgePercent,
  Smartphone,
  CreditCard,
  Headphones,
  HeartHandshake,
};

const defaultFeatures = [
  {
    title: '100% Genuine Products',
    description: 'Every phone is brand new, factory sealed with official manufacturer warranty across India.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Unbeatable Local Prices',
    description: 'We match the best market pricing with zero hidden fees and direct exchange bonuses.',
    icon: 'BadgePercent',
  },
  {
    title: 'Free Setup & Data Transfer',
    description: 'We transfer contacts, photos, and WhatsApp data from your old phone to the new one for free.',
    icon: 'Smartphone',
  },
  {
    title: 'Easy 0% EMI & Finance',
    description: 'Instant paperless approvals via Bajaj Finserv, HDFC, TVS Credit, and all major debit/credit cards.',
    icon: 'CreditCard',
  },
  {
    title: 'Full Accessories Hub',
    description: 'Original chargers, 65W fast cables, premium tempered glass, rugged covers, earbuds & smartwatches.',
    icon: 'Headphones',
  },
  {
    title: 'Trusted After-Sales Care',
    description: 'Reliable service guidance, warranty claim help, and friendly local assistance whenever you need.',
    icon: 'HeartHandshake',
  },
];

const WhyChooseUs = () => {
  const { about } = useShop();

  const features =
    about?.whyChooseUs && about.whyChooseUs.length > 0
      ? about.whyChooseUs
      : defaultFeatures;

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Choose Us"
          title="The Anshu Mobile Advantage"
          subtitle="Why thousands of smartphone buyers trust us for their mobile upgrades year after year."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || CheckCircle2;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white flex items-center justify-center mb-5 transition-colors shadow-sm">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-brand-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
