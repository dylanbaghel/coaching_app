import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        default: 0
    },
    dob: {
        type: Date,
        default: Date.now
    },
    admissionDate: {
        type: Date,
        default: Date.now
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
});

StudentSchema.index({name: 'text', email: 'text'});

const Student = mongoose.model('Student', StudentSchema);

export default Student;