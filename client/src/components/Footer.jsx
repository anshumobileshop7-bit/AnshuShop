import React from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Footer = () => {
  const { settings, getCleanPhone, getCleanWhatsApp } = useShop();

  const phoneNum = getCleanPhone(settings.phone);
  const waNum = getCleanWhatsApp(settings.whatsapp);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/30">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {settings.shopName || 'Anshu Mobile World'}
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed">
              {settings.tagline ||
                'Your premier destination for original smartphones, genuine mobile accessories, instant EMI schemes, and trusted after-sales service.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Explore Store
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Our Shop
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-slate-400 hover:text-white transition-colors">
                  Exclusive Offers & Deals
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-400 hover:text-white transition-colors">
                  Shop Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact & Store Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${phoneNum}`}
                  className="flex items-start gap-2.5 text-slate-400 hover:text-brand-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <span>{settings.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${waNum}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>WhatsApp: {settings.whatsapp}</span>
                </a>
              </li>
              {settings.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-start gap-2.5 text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                    <span>{settings.email}</span>
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{settings.openingHours}</span>
              </li>
            </ul>
          </div>

          {/* Store Location */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Visit Store
            </h4>
            <div className="flex items-start gap-2.5 text-sm text-slate-400 mb-4">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{settings.address}</span>
            </div>

            {settings.mapsUrl && (
              <a
                href={settings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-400 hover:text-brand-300 bg-brand-950/60 border border-brand-800/60 px-3.5 py-2 rounded-xl transition-all"
              >
                <span>Open Google Maps</span>
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar & Attribution */}
        <div className="pt-8 mt-4 border-t border-slate-800/60 flex flex-col items-center justify-between gap-6">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p className="font-medium">© {new Date().getFullYear()} {settings.shopName || 'Anshu Mobile World'}. All Rights Reserved.</p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Genuine Sealed Products
              </span>
              <Link
                to="/admin/login"
                className="flex items-center gap-1 text-slate-500 hover:text-white transition-colors"
              >
                <Lock className="w-3.5 h-3.5" /> Admin Portal
              </Link>
            </div>
          </div>

          {/* Software Provider Attribution */}
          <div className="w-full bg-slate-900/50 rounded-2xl p-4 sm:p-6 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-colors hover:border-brand-500/30">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Designed & Developed By</p>
              <a 
                href="https://software.urbexon.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg sm:text-xl font-extrabold text-white hover:text-brand-400 transition-colors"
              >
                Urbexon Software Solutions
              </a>
            </div>
            <div className="flex flex-col sm:items-end text-sm text-slate-400 font-medium gap-1">
              <a href="tel:+918808485840" className="hover:text-white transition-colors flex items-center justify-center sm:justify-end gap-1.5">
                <Phone className="w-3.5 h-3.5" /> +91 8808485840, 6391981801
              </a>
              <span className="flex items-center justify-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Noida, UP
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
