import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';

// Cloudinary Config
cloudinary.v2.config({
    api_key: '547518744487111',
    api_secret: 'CUel_pRe79VlwTwhPlJkBb8EWXQ',
    cloud_name: 'techpuran',
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'coaching_api_revised',
    allowedFormats: ['jpg', 'jpeg', 'png']
});

const upload = multer({ storage });

export { cloudinary, upload };