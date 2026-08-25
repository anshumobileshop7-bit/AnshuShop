import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Mail,
  Send,
  Navigation,
  CheckCircle2,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { useShop } from '../context/ShopContext';
import { useToast } from '../context/ToastContext';

const ContactSection = () => {
  const { settings, getCleanPhone, getCleanWhatsApp } = useShop();
  const { showSuccess } = useToast();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    message: '',
    preferredBrand: 'Any / General Inquiry',
  });

  const phoneNum = getCleanPhone(settings.phone);
  const waNum = getCleanWhatsApp(settings.whatsapp);

  const handleSubmitInquiry = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      return;
    }

    const waText = `*New Customer Inquiry — Anshu Mobile Website*%0A%0A*Name:* ${encodeURIComponent(
      form.name
    )}%0A*Phone:* ${encodeURIComponent(form.phone)}%0A*Interested In:* ${encodeURIComponent(
      form.preferredBrand
    )}%0A*Message:* ${encodeURIComponent(form.message || 'Looking for phone advice/deals')}`;

    const waUrl = `https://wa.me/${waNum}?text=${waText}`;

    showSuccess('Redirecting to WhatsApp to send your inquiry...');
    window.open(waUrl, '_blank');

    setForm({
      name: '',
      phone: '',
      message: '',
      preferredBrand: 'Any / General Inquiry',
    });
  };

  return (
    <section className="py-20 bg-brand-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get in Touch"
          title="Visit or Contact Anshu Mobile World"
          subtitle="Call, chat on WhatsApp or walk into our store for instant quotes, phone demos, and unmissable local deals."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Quick Action Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Direct Call
                  </h4>
                  <p className="text-base font-extrabold text-slate-900 mt-0.5">
                    {settings.phone}
                  </p>
                </div>
              </div>
              <Button href={`tel:${phoneNum}`} variant="primary" size="sm" icon={Phone}>
                Call
              </Button>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    WhatsApp Chat
                  </h4>
                  <p className="text-base font-extrabold text-slate-900 mt-0.5">
                    {settings.whatsapp}
                  </p>
                </div>
              </div>
              <Button
                href={`https://wa.me/${waNum}?text=${encodeURIComponent(
                  'Hi Anshu Mobile World, I have an inquiry.'
                )}`}
                variant="whatsapp"
                size="sm"
                icon={MessageSquare}
              >
                Chat
              </Button>
            </div>

            {/* Store Address & Hours Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Store Address
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
                    {settings.address}
                  </p>
                  {settings.mapsUrl && (
                    <a
                      href={settings.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 mt-2.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions on Google Maps</span>
                    </a>
                  )}
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Opening Hours
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    {settings.openingHours}
                  </p>
                  <p className="text-xs text-emerald-600 font-bold mt-1">
                    ● Store Open Today
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Send Quick Store Inquiry
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Looking for a specific model price, EMI quotation or stock availability? Fill in your details below.
            </p>

            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Interested Category / Brand
                </label>
                <select
                  value={form.preferredBrand}
                  onChange={(e) => setForm({ ...form, preferredBrand: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 text-sm sm:text-base font-medium text-slate-900 transition-all duration-300 appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1.2rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em' }}
                >
                  <option value="5G Smartphones">5G Smartphones</option>
                  <option value="Apple iPhone">Apple iPhone</option>
                  <option value="Samsung Galaxy">Samsung Galaxy</option>
                  <option value="OnePlus Series">OnePlus Series</option>
                  <option value="Xiaomi / Redmi / POCO">Xiaomi / Redmi / POCO</option>
                  <option value="Realme / Vivo / Oppo">Realme / Vivo / Oppo</option>
                  <option value="0% EMI Finance Deal">0% EMI Finance Deal</option>
                  <option value="Accessories / Earbuds / Watch">Accessories / Earbuds / Watch</option>
                  <option value="Any / General Inquiry">Any / General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Your Message or Model Needed (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="Tell us the device or budget you have in mind..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 resize-none transition-all duration-300"
                />
              </div>

              <Button
                type="submit"
                variant="whatsapp"
                size="lg"
                className="w-full justify-center"
                icon={Send}
              >
                Send Inquiry via WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
