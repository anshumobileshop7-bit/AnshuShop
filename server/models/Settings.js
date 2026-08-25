import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: [true, 'Shop name is required'],
      trim: true,
      default: 'Anshu Mobile World',
    },
    tagline: {
      type: String,
      trim: true,
      default: 'Smartphones, Exclusive Deals & Genuine Accessories',
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      default: '+91 98765 43210',
    },
    whatsapp: {
      type: String,
      required: [true, 'WhatsApp number is required'],
      trim: true,
      default: '+91 98765 43210',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      default: 'contact@anshumobile.com',
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
      default: 'Main Market Road, Opp. Central Plaza, Sector 4, City Center - 800001',
    },
    mapsUrl: {
      type: String,
      trim: true,
      default: 'https://maps.google.com/?q=Anshu+Mobile+Shop',
    },
    openingHours: {
      type: String,
      trim: true,
      default: 'Mon - Sun: 10:00 AM – 09:30 PM (Open All 7 Days)',
    },
    instagram: {
      type: String,
      trim: true,
      default: 'https://instagram.com/anshumobileshop',
    },
    facebook: {
      type: String,
      trim: true,
      default: 'https://facebook.com/anshumobileshop',
    },
    youtube: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
