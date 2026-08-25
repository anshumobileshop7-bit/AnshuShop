import React, { useEffect } from 'react';
import HeroSection from '../sections/HeroSection';
import NewLaunchSection from '../sections/NewLaunchSection';
import OffersSection from '../sections/OffersSection';
import StatsSection from '../sections/StatsSection';
import AboutSection from '../sections/AboutSection';
import GallerySection from '../sections/GallerySection';
import ContactSection from '../sections/ContactSection';
import WhyChooseUs from '../sections/WhyChooseUs';

const HomePage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Slider (Top) */}
      <HeroSection />

      {/* 2. New Launches (High impact, dark theme) */}
      <NewLaunchSection />

      {/* 3. Featured Offers (Deals & Discounts) */}
      <OffersSection isPreview={true} />

      {/* 4. Stats & Trust Metrics (Moved down as requested) */}
      <StatsSection />

      {/* 5. Why Choose Us (Small trust badges) */}
      <WhyChooseUs />

      {/* 6. About Store */}
      <AboutSection />

      {/* 7. Gallery / Store Tour */}
      <GallerySection isPreview={true} />

      {/* 8. Contact & Location */}
      <ContactSection />
    </div>
  );
};

export default HomePage;
