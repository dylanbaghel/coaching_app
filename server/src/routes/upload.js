// Third Party Modules
import express from 'express';
import { isMongoId } from 'validator';
// Custom Module Files
import Image from '../models/Image';
import adminAuth from '../middleware/adminAuth';
import { cloudinary, upload } from '../multer-upload';
import { genErrorObj } from '../utils/utils';
// router initiliaze
const router = express.Router();

// Routes
/**
 * @POST - /upload - Upload New File
 */
router.post('/', adminAuth, (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json(genErrorObj(400, 'upload/remote-error', err.message));
        }

        try {

            const image = new Image({
                publicId: req.file.public_id,
                publicUrl: req.file.url
            });

            const newImage = await image.save();

            return res.status(200).json({ success: true, image: newImage });
        } catch (err) {
            return res.status(500).json(genErrorObj(500, 'upload/internal-error', err.message));
        }
    });
});

/**
 * @Get - /upload - Get All images
 *
 */
router.get('/', adminAuth, async (req, res) => {
    try {
        const images = await Image.find();
        return res.status(200).json({
            success: true,
            count: images.length,
            data: images
        });
    } catch(err) {
        return res.status(500).json(genErrorObj(500, 'upload/internal-error', err.message));
    }
});

/**
 * @DELETE - /upload/:id - Remove Image
 */
router.delete('/:id', adminAuth, async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json(genErrorObj(400, 'upload/no-id', 'Please Provide Id To Delete The Image'));
    } 
    if (!isMongoId(req.params.id)) {
        return res.status(400).json(genErrorObj(400, 'upload/invalid-id', 'Please Provide Valid Id'));
    }

    try {
        const foundImage = await Image.findOne({ _id: req.params.id });
        if (!foundImage) {
            return res.status(404).json(genErrorObj(404, 'upload/not-found', 'Image Not Found'));
        }

        cloudinary.v2.uploader.destroy(foundImage.publicId, (error, result) => {
            if (error) {
                return res.status(400).json(genErrorObj(400, 'upload/remote-error', error));
            }
        });

        const removedImage = await foundImage.remove();
        return res.status(200).json({ success: true, removedImage });

    } catch(err) {
        return res.status(500).json(genErrorObj(500, 'upload/internal-error', err.message));
    }
});

// Export Router
export default router;