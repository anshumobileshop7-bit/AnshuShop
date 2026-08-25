import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone, Phone, Menu, X, Tag, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Button from './Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings, getCleanPhone } = useShop();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Offers', path: '/offers', badge: 'Deals' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const phoneNum = getCleanPhone(settings.phone);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3.5'
          : 'bg-white/70 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/20 group-hover:scale-105 transition-transform duration-300">
            <Smartphone className="w-5 h-5 text-brand-400" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 leading-tight">
              {settings.shopName || 'Anshu Mobile World'}
            </span>
            <span className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.2em] text-slate-500 uppercase">
              Premium Store
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all relative flex items-center gap-1.5 ${
                  isActive
                    ? 'text-brand-600 bg-brand-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full bg-rose-500 text-white animate-pulse">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Call Now Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <Button
            href={`tel:${phoneNum}`}
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
            icon={Phone}
          >
            Call Now
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between ${
                    isActive
                      ? 'bg-brand-50 text-brand-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-xs font-black uppercase px-2 py-0.5 rounded-full bg-rose-500 text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <Button
                href={`tel:${phoneNum}`}
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={Phone}
              >
                Call Shop ({settings.phone})
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
