// src/integrations/cloudinary/cloudinary.config.js
import { v2 as cloudinary } from 'cloudinary';

export const uploadImage = async (file, folder = 'blookmyspace') => {
  if (!file || !file.path) {
    throw new Error('No file provided or invalid file path');
  }
  try {
    console.log(`Uploading file ${file.name} to Cloudinary folder ${folder}`);
    const result = await cloudinary.uploader.upload(file.path, {
      folder,
      resource_type: 'auto',
    });
    return result.secure_url;
  } catch (err) {
    console.error(`Cloudinary upload failed: ${err.message}`, err.stack);
    throw new Error(`Image upload failed: ${err.message}`);
  }
};

export const uploadImageBase64 = async (base64String, folder = 'blookmyspace') => {
  if (!base64String || typeof base64String !== 'string') {
    throw new Error('Base64 string is required for file upload');
  }
  try {
    console.log(`Uploading Base64 image to Cloudinary folder ${folder}`);
    const result = await cloudinary.uploader.upload(base64String, {
      folder,
      resource_type: 'auto',
    });
    return result.secure_url;
  } catch (err) {
    console.error(`Cloudinary Base64 upload failed: ${err.message}`, err.stack);
    throw new Error(`Base64 image upload failed: ${err.message}`);
  }
};

export default cloudinary;