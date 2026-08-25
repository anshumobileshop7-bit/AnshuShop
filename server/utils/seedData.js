import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import Hero from '../models/Hero.js';
import Offer from '../models/Offer.js';
import Gallery from '../models/Gallery.js';
import About from '../models/About.js';
import Settings from '../models/Settings.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    console.log('🌱 Checking and seeding initial data if empty...');

    // 1. Seed Admin
    const adminExists = await Admin.findOne();
    if (!adminExists) {
      await Admin.create({
        name: 'Anshu Mobile Store Owner',
        email: 'admin@anshumobile.com',
        password: 'Admin@12345',
      });
      console.log('  ✅ Admin user created: admin@anshumobile.com / Admin@12345');
    }

    // 2. Seed Hero
    const heroExists = await Hero.findOne();
    if (!heroExists) {
      await Hero.create({
        slides: [
          {
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1600&q=80',
            heading: 'Charge Your Phone Safely!',
            subheading: 'A wonderful serenity has taken possession of my entire soul.',
            buttonText: 'Shop Now',
            buttonLink: 'https://wa.me/919616495021'
          }
        ],
      });
      console.log('  ✅ Hero section seeded');
    }

    // 3. Seed Offers
    const offersCount = await Offer.countDocuments();
    if (offersCount === 0) {
      await Offer.insertMany([
        {
          title: 'Flagship 5G Series — Mega Festive Exchange Deal',
          description:
            'Get up to ₹8,000 extra exchange bonus on your old phone. Includes free screen guard and 67W fast charger.',
          category: 'Smartphones',
          image:
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
          originalPrice: 34999,
          offerPrice: 28999,
          ctaText: 'Inquire on WhatsApp',
          ctaLink: 'https://wa.me/919876543210?text=Hi%20Anshu%20Mobile,%20I%20am%20interested%20in%20the%20Flagship%205G%20Deal',
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          isActive: true,
          isFeatured: true,
          tags: ['5G Ready', 'Exchange Bonus', 'Zero Downpayment'],
        },
        {
          title: 'Premium Budget 5G Phone with 120Hz AMOLED & 50MP OIS',
          description:
            'Massive 5000mAh battery, ultra-smooth display, and stunning low-light camera. Available in multiple sleek colors.',
          category: 'Smartphones',
          image:
            'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
          originalPrice: 19999,
          offerPrice: 15499,
          ctaText: 'Check In-Store Stock',
          ctaLink: 'https://wa.me/919876543210?text=Hi%20Anshu%20Mobile,%20is%20Budget%205G%20AMOLED%20in%20stock?',
          startDate: new Date(),
          endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
          isActive: true,
          isFeatured: true,
          tags: ['Best Seller', '120Hz AMOLED', '50MP OIS'],
        },
        {
          title: 'Pro Wireless Active Noise Cancelling Earbuds',
          description:
            'Crystal clear voice calls, deep bass boost, 40 hours battery life with fast charging case.',
          category: 'Audio',
          image:
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
          originalPrice: 4999,
          offerPrice: 2499,
          ctaText: 'Order via WhatsApp',
          ctaLink: 'https://wa.me/919876543210?text=Hi%20Anshu%20Mobile,%20I%20want%20the%20Pro%20Wireless%20Earbuds',
          startDate: new Date(),
          endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          isActive: true,
          isFeatured: false,
          tags: ['50% OFF', 'ANC Audio', 'Type-C Fast Charge'],
        },
        {
          title: 'All-in-One Mobile Accessories Protection Combo',
          description:
            'Edge-to-edge tempered glass + heavy duty shockproof case + braided 65W fast charging cable bundle.',
          category: 'Accessories',
          image:
            'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',
          originalPrice: 1499,
          offerPrice: 799,
          ctaText: 'Grab Combo Deal',
          ctaLink: 'https://wa.me/919876543210?text=Hi%20Anshu%20Mobile,%20I%20need%20the%20Accessories%20Combo',
          startDate: new Date(),
          endDate: null,
          isActive: true,
          isFeatured: true,
          tags: ['Combo Pack', 'Tempered Glass', 'Fast Cable'],
        },
        {
          title: '0% Interest EMI Scheme on All Multi-Brand Smartphones',
          description:
            'Instant loan approval with Bajaj Finserv, HDFC & IDFC First Bank. Bring Aadhaar and leave with your new phone.',
          category: 'EMI Deal',
          image:
            'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
          originalPrice: null,
          offerPrice: null,
          ctaText: 'Calculate EMI on WhatsApp',
          ctaLink: 'https://wa.me/919876543210?text=Hi%20Anshu%20Mobile,%20please%20help%20me%20with%20EMI%20options',
          startDate: new Date(),
          endDate: null,
          isActive: true,
          isFeatured: false,
          tags: ['0% Interest', 'Zero Downpayment', 'Instant Approval'],
        },
        {
          title: 'Ultra HD AMOLED Smartwatch with Bluetooth Calling',
          description:
            'Metal bezel, IP68 water resistant, 100+ sports modes, 24/7 heart rate and SpO2 tracking.',
          category: 'Accessories',
          image:
            'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
          originalPrice: 5999,
          offerPrice: 2999,
          ctaText: 'Inquire Details',
          ctaLink: 'https://wa.me/919876543210?text=Hi%20Anshu%20Mobile,%20I%20want%20to%20buy%20the%20Smartwatch',
          startDate: new Date(),
          endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          isActive: true,
          isFeatured: false,
          tags: ['Calling Watch', 'AMOLED Screen', 'Fitness Tracker'],
        },
      ]);
      console.log('  ✅ Seeded 6 comprehensive mobile store offers');
    }

    // 4. Seed Gallery
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      await Gallery.insertMany([
        {
          image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1000&q=80',
          caption: 'Welcoming customer checkout counter & device consultation desk',
          category: 'Store Interior',
          order: 1,
        },
        {
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80',
          caption: 'Latest 5G flagship display demo counters',
          category: 'New Stock',
          order: 2,
        },
        {
          image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1000&q=80',
          caption: 'Smart wearables and lifestyle accessories section',
          category: 'Accessories Zone',
          order: 3,
        },
        {
          image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80',
          caption: 'Live demo experiences for all major smartphone brands',
          category: 'Store Interior',
          order: 4,
        },
        {
          image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=1000&q=80',
          caption: 'Original chargers, fast adapters and heavy-duty protective cases',
          category: 'Accessories Zone',
          order: 5,
        },
        {
          image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80',
          caption: 'Happy customer unboxing a brand new smartphone with our team',
          category: 'Customer Moments',
          order: 6,
        },
      ]);
      console.log('  ✅ Seeded 6 gallery showcase images');
    }

    // 5. Seed About
    const aboutExists = await About.findOne();
    if (!aboutExists) {
      await About.create({
        title: 'Your Trusted Local Mobile Store',
        subtitle:
          'Serving our community with 100% genuine smartphones, honest pricing & dependable after-sales care since 2018.',
        description:
          'At Anshu Mobile World, we believe buying a phone should be exciting, transparent, and completely worry-free. Whether you are looking for the latest 5G flagship, a reliable budget device, easy EMI financing, or original accessories, our knowledgeable team is here to guide you with genuine recommendations suited for your exact needs.',
        experienceYears: '7+ Years Experience',
        happyCustomers: '10,000+ Happy Customers',
        smartphonesSold: '15,000+ Devices Delivered',
        image:
          'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
        whyChooseUs: [
          {
            title: '100% Genuine Sealed Products',
            description: 'All phones come with official manufacturer warranty and original brand seal.',
            icon: 'ShieldCheck',
          },
          {
            title: 'Unbeatable Local Market Prices',
            description: 'Direct deals, transparent bills, exchange bonuses and instant festive discounts.',
            icon: 'BadgePercent',
          },
          {
            title: 'Instant Data Transfer & Free Setup',
            description: 'We transfer your photos, WhatsApp chats and contacts for free while you relax.',
            icon: 'Smartphone',
          },
          {
            title: 'Easy 0% EMI & Card Offers',
            description: 'Partnered with Bajaj Finserv, HDFC, IDFC First and all major credit cards.',
            icon: 'CreditCard',
          },
          {
            title: 'Wide Range of Original Accessories',
            description: 'Tempered glass, branded covers, earbuds, smartwatches, power banks & fast chargers.',
            icon: 'Headphones',
          },
          {
            title: 'Trusted After-Sales Guidance',
            description: 'Dedicated post-purchase support, warranty claim assistance and honest service advice.',
            icon: 'HeartHandshake',
          },
        ],
      });
      console.log('  ✅ Seeded About section');
    }

    // 6. Seed Settings
    const settingsExists = await Settings.findOne();
    if (!settingsExists) {
      await Settings.create({
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
        youtube: 'https://youtube.com',
      });
      console.log('  ✅ Seeded Settings');
    }

    console.log('✨ Seeding complete!');
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
  }
};

// Standalone execution script
if (process.argv[1] && process.argv[1].endsWith('seedData.js')) {
  const primaryUri = process.env.MONGO_URI || 'mongodb://localhost:27017/anshu_mobile';
  mongoose
    .connect(primaryUri)
    .then(async () => {
      await seedDatabase();
      process.exit(0);
    })
    .catch((err) => {
      console.error('Failed to run seeder standalone:', err.message);
      process.exit(1);
    });
}
