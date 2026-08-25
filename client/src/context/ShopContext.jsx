import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const ShopContext = createContext();

const defaultSettings = {
  shopName: 'Anshu Mobile World',
  tagline: 'Latest Smartphones, Exclusive Deals & Genuine Accessories',
  phone: '+91 96164 95021',
  whatsapp: '+91 96164 95021',
  email: 'anshu.khanna28@gmail.com',
  address: 'CG9M+CF3, Pahitipur, Abdullah Pur, Uttar Pradesh 224122',
  mapsUrl: 'https://maps.app.goo.gl/9pHGDxo7ATe3TWGGA?g_st=ac',
  openingHours: 'Mon - Sun: 10:00 AM – 09:30 PM (Open All 7 Days)',
  instagram: 'https://instagram.com/anshumobileshop',
  facebook: 'https://facebook.com/anshumobileshop',
  youtube: '',
};

export const ShopProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isColdStarting, setIsColdStarting] = useState(false);

  const fetchShopData = useCallback(async () => {
    // If it takes more than 2.5 seconds, assume the server is cold starting
    const coldStartTimer = setTimeout(() => {
      setIsColdStarting(true);
    }, 2500);

    try {
      const [settingsRes, heroRes, aboutRes] = await Promise.allSettled([
        api.get('/settings'),
        api.get('/hero'),
        api.get('/about'),
      ]);

      if (settingsRes.status === 'fulfilled' && settingsRes.value.data?.data) {
        setSettings(settingsRes.value.data.data);
      }
      if (heroRes.status === 'fulfilled' && heroRes.value.data?.data) {
        setHero(heroRes.value.data.data);
      }
      if (aboutRes.status === 'fulfilled' && aboutRes.value.data?.data) {
        setAbout(aboutRes.value.data.data);
      }
    } catch (err) {
      console.error('Failed to load shop configuration:', err);
    } finally {
      clearTimeout(coldStartTimer);
      setLoading(false);
      // Wait a tiny bit for React to render the data before hiding the cold start screen
      setTimeout(() => setIsColdStarting(false), 500);
    }
  }, []);

  useEffect(() => {
    fetchShopData();
  }, [fetchShopData]);

  const refreshShopData = () => {
    return fetchShopData();
  };

  const getCleanPhone = (phoneStr) => {
    return (phoneStr || settings.phone || '').replace(/[^0-9+]/g, '');
  };

  const getCleanWhatsApp = (waStr) => {
    const raw = (waStr || settings.whatsapp || '').replace(/[^0-9]/g, '');
    return raw.startsWith('91') ? raw : `91${raw}`;
  };

  return (
    <ShopContext.Provider
      value={{
        settings,
        hero,
        about,
        loading,
        isColdStarting,
        refreshShopData,
        getCleanPhone,
        getCleanWhatsApp,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
