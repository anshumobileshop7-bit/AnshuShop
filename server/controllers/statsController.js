import Offer from '../models/Offer.js';
import Gallery from '../models/Gallery.js';
import Hero from '../models/Hero.js';
import Settings from '../models/Settings.js';

// @desc    Get admin dashboard metrics and overview stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getAdminStats = async (req, res, next) => {
  try {
    const [totalOffers, activeOffers, galleryCount, heroData, settingsData] = await Promise.all([
      Offer.countDocuments(),
      Offer.countDocuments({ isActive: true }),
      Gallery.countDocuments(),
      Hero.findOne().sort({ updatedAt: -1 }),
      Settings.findOne().sort({ updatedAt: -1 }),
    ]);

    const recentOffers = await Offer.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        totalOffers,
        activeOffers,
        galleryCount,
        heroLastUpdated: heroData ? heroData.updatedAt : null,
        settingsLastUpdated: settingsData ? settingsData.updatedAt : null,
        shopName: settingsData ? settingsData.shopName : 'Anshu Mobile World',
        recentOffers,
      },
    });
  } catch (error) {
    next(error);
  }
};
