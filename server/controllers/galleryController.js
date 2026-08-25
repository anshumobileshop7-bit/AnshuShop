import Gallery from '../models/Gallery.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import { getCache, setCache, clearCachePrefix } from '../utils/cache.js';

// @desc    Get all gallery photos
// @route   GET /api/gallery
// @access  Public
export const getGalleryImages = async (req, res, next) => {
  try {
    const category = req.query.category || 'All';
    const cacheKey = `gallery_${category}`;
    const cachedData = getCache(cacheKey);
    if (cachedData) return res.json({ success: true, count: cachedData.length, data: cachedData, cached: true });

    const filter = category && category !== 'All' ? { category } : {};
    const images = await Gallery.find(filter).sort({ order: 1, createdAt: -1 });

    setCache(cacheKey, images);

    res.json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload new gallery image
// @route   POST /api/admin/gallery
// @access  Private (Admin)
export const uploadGalleryImage = async (req, res, next) => {
  try {
    const { caption, category, image: imageUrl, order } = req.body;

    let finalImageUrl = imageUrl;

    if (req.file) {
      finalImageUrl = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        'anshu_mobile/gallery'
      );
    }

    if (!finalImageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const galleryItem = await Gallery.create({
      image: finalImageUrl,
      caption: caption || '',
      category: category || 'Store Interior',
      order: order ? Number(order) : 0,
    });

    clearCachePrefix('gallery_');

    res.status(201).json({
      success: true,
      message: 'Gallery image added successfully',
      data: galleryItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/admin/gallery/:id
// @access  Private (Admin)
export const deleteGalleryImage = async (req, res, next) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    await image.deleteOne();
    clearCachePrefix('gallery_');

    res.json({
      success: true,
      message: 'Gallery image deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
