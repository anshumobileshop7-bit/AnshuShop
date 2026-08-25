import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from './context/ShopContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ColdStartLoader from './components/ColdStartLoader';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import OffersPage from './pages/OffersPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHero from './pages/admin/AdminHero';
import AdminOffers from './pages/admin/AdminOffers';
import AdminGallery from './pages/admin/AdminGallery';
import AdminAbout from './pages/admin/AdminAbout';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  const { isColdStarting } = useShop();

  return (
    <>
      <AnimatePresence>
        {isColdStarting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="relative z-[100]"
          >
            <ColdStartLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        {/* Public Storefront Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Admin Login Route (Public) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin CMS Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/hero" element={<AdminHero />} />
            <Route path="/admin/offers" element={<AdminOffers />} />
            <Route path="/admin/gallery" element={<AdminGallery />} />
            <Route path="/admin/about" element={<AdminAbout />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* Catch-all 404 Route */}
        <Route element={<PublicLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
