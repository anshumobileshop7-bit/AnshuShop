import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const FloatingContactBar = () => {
  const { settings, getCleanPhone, getCleanWhatsApp } = useShop();
  
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false); // Hide on scroll down past 150px
      } else {
        setIsVisible(true);  // Show on scroll up or near top
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const phoneNum = getCleanPhone(settings.phone);
  const waNum = getCleanWhatsApp(settings.whatsapp);

  return (
    <>
      {/* Desktop Floating WhatsApp badge */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col gap-3">
        <a
          href={`https://wa.me/${waNum}?text=${encodeURIComponent('Hi Anshu Mobile World, I have a quick question.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all font-bold text-sm tracking-wide"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* Mobile Bottom Fixed Action Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 px-4 flex items-center justify-between gap-3 shadow-2xl transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-[120%]'}`}
      >
        <a
          href={`tel:${phoneNum}`}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-xl font-bold text-sm shadow-sm"
        >
          <Phone className="w-4 h-4" />
          <span>Call Shop</span>
        </a>

        <a
          href={`https://wa.me/${waNum}?text=${encodeURIComponent('Hi Anshu Mobile World, I want to inquire about phone deals.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl font-bold text-sm shadow-sm"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>

        {settings.mapsUrl && (
          <a
            href={settings.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0"
            title="Get Directions"
          >
            <MapPin className="w-5 h-5 text-brand-600" />
          </a>
        )}
      </div>
    </>
  );
};

export default FloatingContactBar;
