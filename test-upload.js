const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('--- Testing Real Image Upload to Cloudinary ---');

// Use a known reliable URL
const testImage = 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png';

cloudinary.uploader.upload(testImage, { folder: 'wuarike/test' }, (error, result) => {
  if (error) {
    console.error('Upload FAILED:', error.message);
  } else {
    console.log('Upload SUCCESSFUL!');
    console.log('Secure URL:', result.secure_url);
    
    // Cleanup
    cloudinary.uploader.destroy(result.public_id, (err, res) => {
      if (err) console.error('Cleanup failed:', err);
      else console.log('Cleanup successful (deleted test file).');
    });
  }
});
