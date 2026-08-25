import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const isCloudinaryConfigured = () => {
  return (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('✅ Cloudinary Configured');
} else {
  console.log('ℹ️ Cloudinary credentials not fully set; image uploads will use optimized base64 data URIs.');
}

export const uploadToCloudinary = async (fileBuffer, mimeType, folder = 'anshu_mobile') => {
  if (isCloudinaryConfigured()) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
      uploadStream.end(fileBuffer);
    });
  }

  // Graceful fallback to Data URI when Cloudinary credentials are not set
  const base64 = fileBuffer.toString('base64');
  return `data:${mimeType || 'image/jpeg'};base64,${base64}`;
};

export default cloudinary;
