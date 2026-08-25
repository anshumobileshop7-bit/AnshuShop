import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import sharp from 'sharp';

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

  // Graceful fallback: Compress image drastically using sharp before base64 conversion
  // This heavily reduces payload size and speeds up API response times.
  const compressedBuffer = await sharp(fileBuffer)
    .resize({ width: 1200, withoutEnlargement: true }) // Downscale large images
    .webp({ quality: 70 }) // Convert to webp and lower quality
    .toBuffer();

  const base64 = compressedBuffer.toString('base64');
  return `data:image/webp;base64,${base64}`;
};

export default cloudinary;
