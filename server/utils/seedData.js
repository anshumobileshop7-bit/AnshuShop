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

    // 2. We no longer seed dummy Hero, Offers, Gallery, and About.
    // The dashboard is completely empty so you can add real data!

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
