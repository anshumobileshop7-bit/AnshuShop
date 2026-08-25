import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Settings from './models/Settings.js';
import Hero from './models/Hero.js';

dotenv.config();

const updateDB = async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Updating settings and hero...');

    await Settings.updateOne({}, {
      phone: '+91 96164 95021',
      whatsapp: '+91 96164 95021',
      email: 'anshu.khanna28@gmail.com',
      address: 'CG9M+CF3, Pahitipur, Abdullah Pur, Uttar Pradesh 224122',
      mapsUrl: 'https://maps.app.goo.gl/9pHGDxo7ATe3TWGGA?g_st=ac',
    });
    console.log('Settings updated!');

    await Hero.updateOne({}, {
      $unset: {
        heading: "",
        subheading: "",
        image: "",
        primaryButtonText: "",
        primaryButtonUrl: "",
        secondaryButtonText: "",
        secondaryButtonUrl: "",
        badgeText: ""
      },
      $set: {
        banners: [
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1600&q=80'
        ]
      }
    });
    console.log('Hero updated!');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateDB();
