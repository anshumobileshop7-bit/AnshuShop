import Hero from '../models/Hero.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import { getCache, setCache, clearCache } from '../utils/cache.js';

// @desc    Get Hero section data
// @route   GET /api/hero
// @access  Public
export const getHeroData = async (req, res, next) => {
  try {
    const cacheKey = 'hero_data';
    const cachedData = getCache(cacheKey);
    
    if (cachedData) {
      return res.json({ success: true, data: cachedData, cached: true });
    }

    let hero = await Hero.findOne().sort({ createdAt: -1 });

    if (!hero) {
      hero = await Hero.create({
        slides: [
          {
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1600&q=80',
            heading: 'Charge Your Phone Safely!',
            subheading: 'A wonderful serenity has taken possession of my entire soul.',
            buttonText: 'TO SHOP',
            buttonLink: '',
          }
        ],
      });
    }

    setCache(cacheKey, hero);

    res.json({
      success: true,
      data: hero,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Hero section data
// @route   PUT /api/admin/hero
// @access  Private (Admin)
export const updateHeroData = async (req, res, next) => {
  try {
    const { slidesData } = req.body;
    
    let parsedSlides = [];
    if (slidesData) {
      try {
        parsedSlides = JSON.parse(slidesData);
      } catch (e) {
        return res.status(400).json({ success: false, message: 'Invalid slidesData format' });
      }
    }

    // Process new image uploads
    let uploadIndex = 0;
    for (let i = 0; i < parsedSlides.length; i++) {
      if (parsedSlides[i].isNewImage) {
        if (req.files && req.files[uploadIndex]) {
          const file = req.files[uploadIndex];
          const uploadedUrl = await uploadToCloudinary(file.buffer, file.mimetype, 'anshu_mobile/hero');
          parsedSlides[i].image = uploadedUrl;
          uploadIndex++;
        }
      }
      // Remove temporary flags
      delete parsedSlides[i].isNewImage;
    }

    // Ensure max 5 slides
    const finalSlides = parsedSlides.slice(0, 5);

    let hero = await Hero.findOne().sort({ createdAt: -1 });

    if (!hero) {
      hero = new Hero({ slides: finalSlides });
    } else {
      hero.slides = finalSlides;
    }

    const updatedHero = await hero.save();
    clearCache('hero_data'); // Invalidate cache

    res.json({
      success: true,
      message: 'Hero slider updated successfully',
      data: updatedHero,
    });
  } catch (error) {
    next(error);
  }
};
