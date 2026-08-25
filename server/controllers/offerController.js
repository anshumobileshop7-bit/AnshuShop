import Offer from '../models/Offer.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import { getCache, setCache, clearCachePrefix } from '../utils/cache.js';

// @desc    Get all active offers (or all for admin query)
// @route   GET /api/offers
// @access  Public
export const getOffers = async (req, res, next) => {
  try {
    const { category, featured, all, search } = req.query;
    const cacheKey = `offers_${category || 'all'}_${featured || 'false'}_${all || 'false'}_${search || 'none'}`;
    const cachedData = getCache(cacheKey);
    if (cachedData) return res.json({ success: true, count: cachedData.length, data: cachedData, cached: true });

    const query = {};
    if (all !== 'true') {
      query.isActive = true;
    }
    if (category && category !== 'All') {
      query.category = category;
    }
    if (featured === 'true') {
      query.isFeatured = true;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const offers = await Offer.find(query).sort({ createdAt: -1 });

    setCache(cacheKey, offers);

    res.json({
      success: true,
      count: offers.length,
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single offer by ID
// @route   GET /api/offers/:id
// @access  Public
export const getOfferById = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found',
      });
    }

    res.json({
      success: true,
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new offer
// @route   POST /api/admin/offers
// @access  Private (Admin)
export const createOffer = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      image: imageUrl,
      originalPrice,
      offerPrice,
      ctaText,
      ctaLink,
      startDate,
      endDate,
      isActive,
      isFeatured,
      tags,
    } = req.body;

    let finalImageUrl = imageUrl;

    if (req.file) {
      finalImageUrl = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        'anshu_mobile/offers'
      );
    }

    if (!finalImageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Offer image is required',
      });
    }

    const parsedTags = typeof tags === 'string' ? tags.split(',').map((t) => t.trim()).filter(Boolean) : tags || [];

    const offer = await Offer.create({
      title,
      description,
      category: category || 'Smartphones',
      image: finalImageUrl,
      originalPrice: originalPrice ? Number(originalPrice) : null,
      offerPrice: offerPrice ? Number(offerPrice) : null,
      ctaText: ctaText || 'Inquire on WhatsApp',
      ctaLink: ctaLink || '',
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null,
      isActive: isActive !== undefined ? String(isActive) === 'true' || isActive === true : true,
      isFeatured: isFeatured !== undefined ? String(isFeatured) === 'true' || isFeatured === true : false,
      tags: parsedTags,
    });

    clearCachePrefix('offers_');

    res.status(201).json({
      success: true,
      message: 'Offer created successfully',
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update offer
// @route   PUT /api/admin/offers/:id
// @access  Private (Admin)
export const updateOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found',
      });
    }

    const {
      title,
      description,
      category,
      image: imageUrl,
      originalPrice,
      offerPrice,
      ctaText,
      ctaLink,
      startDate,
      endDate,
      isActive,
      isFeatured,
      tags,
    } = req.body;

    if (req.file) {
      offer.image = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        'anshu_mobile/offers'
      );
    } else if (imageUrl) {
      offer.image = imageUrl;
    }

    if (title !== undefined) offer.title = title;
    if (description !== undefined) offer.description = description;
    if (category !== undefined) offer.category = category;
    if (originalPrice !== undefined) offer.originalPrice = originalPrice ? Number(originalPrice) : null;
    if (offerPrice !== undefined) offer.offerPrice = offerPrice ? Number(offerPrice) : null;
    if (ctaText !== undefined) offer.ctaText = ctaText;
    if (ctaLink !== undefined) offer.ctaLink = ctaLink;
    if (startDate !== undefined) offer.startDate = startDate ? new Date(startDate) : offer.startDate;
    if (endDate !== undefined) offer.endDate = endDate ? new Date(endDate) : null;
    if (isActive !== undefined) offer.isActive = String(isActive) === 'true' || isActive === true;
    if (isFeatured !== undefined) offer.isFeatured = String(isFeatured) === 'true' || isFeatured === true;
    if (tags !== undefined) {
      offer.tags = typeof tags === 'string' ? tags.split(',').map((t) => t.trim()).filter(Boolean) : tags;
    }

    const updatedOffer = await offer.save();
    clearCachePrefix('offers_');

    res.json({
      success: true,
      message: 'Offer updated successfully',
      data: updatedOffer,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle offer active status
// @route   PATCH /api/admin/offers/:id/toggle
// @access  Private (Admin)
export const toggleOfferStatus = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found',
      });
    }

    offer.isActive = !offer.isActive;
    await offer.save();
    clearCachePrefix('offers_');

    res.json({
      success: true,
      message: `Offer ${offer.isActive ? 'activated' : 'deactivated'} successfully`,
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete offer
// @route   DELETE /api/admin/offers/:id
// @access  Private (Admin)
export const deleteOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found',
      });
    }

    await offer.deleteOne();
    clearCachePrefix('offers_');

    res.json({
      success: true,
      message: 'Offer deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
