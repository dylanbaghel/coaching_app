import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    publicId: {
        type: String,
        required: true,
        unique: true
    },
    publicUrl: {
        type: String,
        required: true,
        unique: true
    }
});

const Image = mongoose.model('Image', ImageSchema);

export default Image;