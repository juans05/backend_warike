const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Testing Cloudinary with:');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);

cloudinary.api.ping((error, result) => {
  if (error) {
    console.error('Ping failed:', error.message);
    if (error.http_code === 401) {
      console.error('Error likely indicates invalid API Key or Secret.');
    }
  } else {
    console.log('Ping successful:', result);
  }
});
