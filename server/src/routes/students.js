// Third Party Module
import express from 'express';

// Custom Module Files
import Student from '../models/Student';
import userAuth from '../middleware/userAuth';
import { genErrorObj } from '../utils/utils';
// Initialize Router
const router = express.Router();

// Routes
router.get('/', userAuth, async (req, res) => {
    try {
        const foundStudent = await Student.findOne({ email: req.user.email });
        if (!foundStudent) {
            return res.status(404).json(genErrorObj(404, 'students/not-found', 'You are not admitted to the coaching. Please fill the enquiry form to get the details.'));
        }

        return res.json({
            success: true,
            data: foundStudent
        });
    } catch(err) {
        return res.status(500).json(genErrorObj(500, 'students/internal-error', err.message));
    }
})

// export Router
export default router;