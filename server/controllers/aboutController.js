import About from '../models/About.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import { getCache, setCache, clearCache } from '../utils/cache.js';

// @desc    Get About section data
// @route   GET /api/about
// @access  Public
export const getAboutData = async (req, res, next) => {
  try {
    const cacheKey = 'about_data';
    const cachedData = getCache(cacheKey);
    if (cachedData) return res.json({ success: true, data: cachedData, cached: true });

    let about = await About.findOne().sort({ createdAt: -1 });

    if (!about) {
      about = await About.create({
        title: 'Your Trusted Mobile Store',
        subtitle:
          'Providing genuine smartphones, original accessories & exceptional local customer support since 2018.',
        description:
          'At Anshu Mobile World, we help customers find the right smartphone, accessories and mobile solutions at genuine prices. Our focus is simple: Good Products, Fair Prices, Reliable Service, and Happy Customers.',
        experienceYears: '7+ Years Experience',
        happyCustomers: '10,000+ Happy Customers',
        smartphonesSold: '15,000+ Devices Delivered',
        image:
          'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
        whyChooseUs: [
          {
            title: '100% Genuine Products',
            description: 'Brand new, sealed smartphones with full official manufacturer brand warranty.',
            icon: 'ShieldCheck',
          },
          {
            title: 'Unbeatable Local Prices',
            description: 'Transparent pricing with zero hidden charges and maximum savings.',
            icon: 'BadgePercent',
          },
          {
            title: 'Instant Data Transfer & Setup',
            description: 'Free phone setup, contact transfer and data migration support on spot.',
            icon: 'Smartphone',
          },
          {
            title: 'Easy EMI & Card Offers',
            description: 'Zero cost EMI, Bajaj Finserv, credit card cashback & exchange bonuses.',
            icon: 'CreditCard',
          },
          {
            title: 'Complete Accessories Hub',
            description: 'Screen protectors, rugged covers, chargers, earbuds and smartwatches in stock.',
            icon: 'Headphones',
          },
          {
            title: 'Dedicated After-Sales Care',
            description: 'Friendly guidance, warranty claim assistance and trusted repair recommendations.',
            icon: 'HeartHandshake',
          },
        ],
      });
    }

    setCache(cacheKey, about);

    res.json({
      success: true,
      data: about,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update About section data
// @route   PUT /api/admin/about
// @access  Private (Admin)
export const updateAboutData = async (req, res, next) => {
  try {
    const {
      title,
      subtitle,
      description,
      experienceYears,
      happyCustomers,
      smartphonesSold,
      image: imageUrl,
      whyChooseUs,
    } = req.body;

    let finalImageUrl = imageUrl;

    if (req.file) {
      finalImageUrl = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        'anshu_mobile/about'
      );
    }

    let about = await About.findOne().sort({ createdAt: -1 });

    if (!about) {
      about = new About({
        title: title || 'Your Trusted Mobile Store',
        subtitle: subtitle || '',
        description: description || '',
        experienceYears: experienceYears || '7+ Years Experience',
        happyCustomers: happyCustomers || '10,000+ Happy Customers',
        smartphonesSold: smartphonesSold || '15,000+ Devices Delivered',
        image:
          finalImageUrl ||
          'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
        whyChooseUs: whyChooseUs ? (typeof whyChooseUs === 'string' ? JSON.parse(whyChooseUs) : whyChooseUs) : [],
      });
    } else {
      if (title !== undefined) about.title = title;
      if (subtitle !== undefined) about.subtitle = subtitle;
      if (description !== undefined) about.description = description;
      if (experienceYears !== undefined) about.experienceYears = experienceYears;
      if (happyCustomers !== undefined) about.happyCustomers = happyCustomers;
      if (smartphonesSold !== undefined) about.smartphonesSold = smartphonesSold;
      if (finalImageUrl) about.image = finalImageUrl;
      if (whyChooseUs !== undefined) {
        about.whyChooseUs = typeof whyChooseUs === 'string' ? JSON.parse(whyChooseUs) : whyChooseUs;
      }
    }

    const updatedAbout = await about.save();
    clearCache('about_data');

    res.json({
      success: true,
      message: 'About section updated successfully',
      data: updatedAbout,
    });
  } catch (error) {
    next(error);
  }
};
