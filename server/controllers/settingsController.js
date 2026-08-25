import Settings from '../models/Settings.js';
import { getCache, setCache, clearCache } from '../utils/cache.js';

// @desc    Get Shop settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    const cacheKey = 'settings_data';
    const cachedData = getCache(cacheKey);
    if (cachedData) return res.json({ success: true, data: cachedData, cached: true });

    let settings = await Settings.findOne().sort({ createdAt: -1 });

    if (!settings) {
      settings = await Settings.create({
        shopName: 'Anshu Mobile World',
        tagline: 'Smartphones, Exclusive Deals & Genuine Accessories',
        phone: '+91 98765 43210',
        whatsapp: '+91 98765 43210',
        email: 'contact@anshumobile.com',
        address: 'Main Market Road, Opp. Central Plaza, Sector 4, City Center - 800001',
        mapsUrl: 'https://maps.google.com/?q=Anshu+Mobile+Shop',
        openingHours: 'Mon - Sun: 10:00 AM – 09:30 PM (Open All 7 Days)',
        instagram: 'https://instagram.com/anshumobileshop',
        facebook: 'https://facebook.com/anshumobileshop',
        youtube: '',
      });
    }

    setCache(cacheKey, settings);

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Shop settings
// @route   PUT /api/admin/settings
// @access  Private (Admin)
export const updateSettings = async (req, res, next) => {
  try {
    const {
      shopName,
      tagline,
      phone,
      whatsapp,
      email,
      address,
      mapsUrl,
      openingHours,
      instagram,
      facebook,
      youtube,
    } = req.body;

    let settings = await Settings.findOne().sort({ createdAt: -1 });

    if (!settings) {
      settings = new Settings({
        shopName,
        tagline,
        phone,
        whatsapp,
        email,
        address,
        mapsUrl,
        openingHours,
        instagram,
        facebook,
        youtube,
      });
    } else {
      if (shopName !== undefined) settings.shopName = shopName;
      if (tagline !== undefined) settings.tagline = tagline;
      if (phone !== undefined) settings.phone = phone;
      if (whatsapp !== undefined) settings.whatsapp = whatsapp;
      if (email !== undefined) settings.email = email;
      if (address !== undefined) settings.address = address;
      if (mapsUrl !== undefined) settings.mapsUrl = mapsUrl;
      if (openingHours !== undefined) settings.openingHours = openingHours;
      if (instagram !== undefined) settings.instagram = instagram;
      if (facebook !== undefined) settings.facebook = facebook;
      if (youtube !== undefined) settings.youtube = youtube;
    }

    const updatedSettings = await settings.save();
    clearCache('settings_data');

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: updatedSettings,
    });
  } catch (error) {
    next(error);
  }
};
