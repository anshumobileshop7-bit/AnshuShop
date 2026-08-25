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
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/30">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                {settings.shopName || 'Anshu Mobile World'}
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {settings.tagline ||
                'Your premier destination for original smartphones, genuine mobile accessories, instant EMI schemes, and trusted after-sales service.'}
            </p>

            <div className="flex items-center gap-4 pt-2">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-sm"
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
                  className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-sm"
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
                  className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-sm"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-5">
              Explore Store
            </h4>
            <ul className="space-y-3.5 text-sm">
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
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-5">
              Direct Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={`tel:${phoneNum}`}
                  className="flex items-start gap-3 text-slate-400 hover:text-brand-400 transition-colors"
                >
                  <div className="p-1.5 rounded-md bg-brand-950 border border-brand-800/50 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-brand-500" />
                  </div>
                  <span className="mt-1">{settings.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${waNum}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <div className="p-1.5 rounded-md bg-emerald-950 border border-emerald-800/50 mt-0.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <span className="mt-1">WhatsApp: {settings.whatsapp}</span>
                </a>
              </li>
              {settings.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-start gap-3 text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    <div className="p-1.5 rounded-md bg-brand-950 border border-brand-800/50 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-brand-500" />
                    </div>
                    <span className="mt-1">{settings.email}</span>
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3 text-slate-400">
                <div className="p-1.5 rounded-md bg-amber-950 border border-amber-800/50 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <span className="mt-1 leading-relaxed">{settings.openingHours}</span>
              </li>
            </ul>
          </div>

          {/* Store Location */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-5">
              Visit Store
            </h4>
            <div className="flex items-start gap-3 text-sm text-slate-400 mb-5">
              <div className="p-1.5 rounded-md bg-rose-950 border border-rose-800/50 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <span className="mt-1 leading-relaxed">{settings.address}</span>
            </div>

            {settings.mapsUrl && (
              <a
                href={settings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-400 hover:text-brand-300 bg-brand-950/60 border border-brand-800/60 px-4 py-2.5 rounded-xl transition-all hover:bg-brand-900 shadow-sm"
              >
                <span>Open Google Maps</span>
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar & Attribution */}
        <div className="pt-8 mt-4 border-t border-slate-800/60 flex flex-col items-center justify-between gap-8">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5 text-sm text-slate-500">
            <p className="font-medium text-center md:text-left">© {new Date().getFullYear()} {settings.shopName || 'Anshu Mobile World'}. All Rights Reserved.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <span className="flex items-center gap-1.5 text-slate-400 font-medium bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Genuine Sealed Products
              </span>
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 text-slate-500 hover:text-white transition-colors"
              >
                <Lock className="w-3.5 h-3.5" /> Admin Portal
              </Link>
            </div>
          </div>

          {/* Software Provider Attribution */}
          <div className="w-full bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left transition-all hover:border-brand-500/40">
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1.5">Designed & Developed By</p>
              <a 
                href="https://software.urbexon.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 hover:from-brand-300 hover:to-brand-500 transition-all drop-shadow-sm"
              >
                Urbexon Software Solutions
              </a>
            </div>
            
            <div className="flex flex-col sm:items-end text-sm text-slate-400 font-medium gap-3">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 sm:gap-4">
                <a href="tel:+918808485840" className="hover:text-white transition-colors flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <Phone className="w-3.5 h-3.5" /> 
                  </div>
                  <span>+91 8808485840, 6391981801</span>
                </a>
                <a 
                  href="https://wa.me/918808485840?text=Hi%20Urbexon%20Software%20Solutions,%20I%20am%20interested%20in%20building%20a%20website."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border border-emerald-500/20 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Us
                </a>
              </div>
              <span className="flex items-center justify-center sm:justify-end gap-2 text-xs uppercase tracking-wider font-semibold text-slate-500">
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
