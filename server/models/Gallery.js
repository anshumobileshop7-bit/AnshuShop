import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'Gallery image URL is required'],
    },
    caption: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      trim: true,
      default: 'Store Interior',
      enum: ['Store Interior', 'Customer Moments', 'New Stock', 'Accessories Zone', 'General'],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
