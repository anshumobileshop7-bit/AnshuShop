import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      default: 'Your Trusted Mobile Store',
    },
    subtitle: {
      type: String,
      trim: true,
      default: 'Providing genuine smartphones, original accessories & exceptional local customer support since 2018.',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      default:
        'At Anshu Mobile World, we help customers find the right smartphone, accessories and mobile solutions at genuine prices. Our focus is simple: Good Products, Fair Prices, Reliable Service, and Happy Customers.',
    },
    experienceYears: {
      type: String,
      trim: true,
      default: '7+ Years Experience',
    },
    happyCustomers: {
      type: String,
      trim: true,
      default: '10,000+ Happy Customers',
    },
    smartphonesSold: {
      type: String,
      trim: true,
      default: '15,000+ Devices Delivered',
    },
    image: {
      type: String,
      required: [true, 'Shop image is required'],
    },
    whyChooseUs: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, default: 'ShieldCheck' },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const About = mongoose.model('About', aboutSchema);
export default About;
