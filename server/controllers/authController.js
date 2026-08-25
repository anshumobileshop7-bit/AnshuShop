import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'anshu_mobile_super_secure_jwt_secret_key_2026_x89!#',
    {
      expiresIn: '30d',
    }
  );
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          token: generateToken(admin._id),
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current admin profile
// @route   GET /api/admin/me
// @access  Private
export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin password or credentials
// @route   PUT /api/admin/change-password
// @access  Private
export const updateAdminPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, name, email } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    if (name) admin.name = name;
    if (email) admin.email = email.toLowerCase().trim();

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current password is required to change password',
        });
      }

      const isMatch = await admin.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Current password does not match',
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters long',
        });
      }

      admin.password = newPassword;
    }

    const updatedAdmin = await admin.save();

    res.json({
      success: true,
      message: 'Admin profile updated successfully',
      data: {
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        token: generateToken(updatedAdmin._id),
      },
    });
  } catch (error) {
    next(error);
  }
};
