import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    default: '',
  },
  subheading: {
    type: String,
    default: '',
  },
  buttonText: {
    type: String,
    default: '',
  },
  buttonLink: {
    type: String,
    default: '',
  },
});

const heroSchema = new mongoose.Schema(
  {
    slides: {
      type: [slideSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Hero = mongoose.model('Hero', heroSchema);
export default Hero;
