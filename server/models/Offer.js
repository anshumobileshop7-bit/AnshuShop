import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Offer title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: 'Smartphones',
      enum: ['Smartphones', 'Accessories', 'Audio', 'Festive Offer', 'EMI Deal', 'Special Deal'],
    },
    image: {
      type: String,
      required: [true, 'Offer image URL is required'],
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    offerPrice: {
      type: Number,
      default: null,
    },
    ctaText: {
      type: String,
      trim: true,
      default: 'Inquire on WhatsApp',
    },
    ctaLink: {
      type: String,
      trim: true,
      default: '',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
