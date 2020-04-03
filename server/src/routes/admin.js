// Third Party Modules
import { Router } from 'express';
import { isEmail, isMongoId } from 'validator';
// Custom Module Files
import { genErrorObj } from '../utils/utils';
import User from '../models/User';
import Student from '../models/Student';
import adminAuth from '../middleware/adminAuth';
// Initialize Router
const router = Router();

// Routes
/**
 * @POST - /login
 * LOGIN ADMIN USER
 */
router.post('/login', async (req, res) => {
    if (!req.body.email) {
        return res.status(400).json(genErrorObj(400, 'admin/email-missing', 'Please Enter Email'));
    }
    if (!isEmail(req.body.email)) {
        return res.status(400).json(genErrorObj(400, 'admin/email-invalid', 'Please Enter Valid Email'))
    }
    if (!req.body.password) {
        return res.status(400).json(genErrorObj(400, 'admin/password-missing', 'Please Enter Password'));
    }

    try {
        const foundAdminUser = await User.findOne({ email: req.body.email, role: 'admin' }).populate('image');
        if (!foundAdminUser) {
            return res.status(404).json(genErrorObj(404, 'admin/user-not-registered', 'This is not a admin user'));
        }

        const isMatch = await foundAdminUser.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(400).json(genErrorObj(400, 'admin/password-incorrect', 'Password Incorrect'));
        }

        const token = foundAdminUser.generateAuthToken();
        return res.header('Authorization', token).json({
            success: true,
            data: {
                user: foundAdminUser,
                token
            }
        });
    } catch (err) {
        return res.status(400).json(genErrorObj(400, 'admin/internal-error', err.message));
    }
});

/**
 * @GET - /me 
 * GET PROFILE OF ADMIN
 */
router.get('/me', adminAuth, (req, res) => {
    return res.json({
        user: req.user
    });

});

/**
 * @POST - /students
 * ADD NEW STUDENT TO THE COACHING
 */
router.post('/students', adminAuth, async (req, res) => {
    const { name, email, phone, fees, dob, admissionDate } = req.body;

    if (!name) {
        return res.status(400).json(genErrorObj(400, 'admin/students/name-missing', 'Please Enter Name'));
    }
    if (!email) {
        return res.status(400).json(genErrorObj(400, 'admin/students/email-missing', 'Please Enter Email'));
    }
    if (!isEmail(email)) {
        return res.status(400).json(genErrorObj(400, 'admin/students/email-invalid', 'Please Enter Valid Email'));
    }
    if (!phone) {
        return res.status(400).json(genErrorObj(400, 'admin/students/phone-missing', 'Please Enter Phone Number'));
    }

    try {
        const foundStudent = await Student.findOne({ email });
        if (foundStudent) {
            return res.status(400).json(genErrorObj(400, 'admin/students/already-added', 'Student With This Email is Already Admitted'));
        }

        const newStudent = new Student({ ...req.body });
        const createdStudent = await newStudent.save();

        return res.json({
            success: true,
            student: createdStudent
        });
    } catch (err) {
        return res.status(500).json(genErrorObj(500, 'admin/students/internal-error', err.message));
    }
});


/**
 * @GET - /admin/students
 */
router.get('/students', adminAuth, async (req, res) => {
    const pageNo = parseInt(req.query.pageNo) || 1;
    const size = parseInt(req.query.size) || 10;
    const search = req.query.search || '';
    let skip = 0;
    let limit = 10;
    let prev = 0;
    let next = 2;
    let query = {};

    if (search) {
        query.$text = {
            $search: search,
            $caseSensitive: false
        }
    }

    if (pageNo <= 0 || size <= 0) {
        return res.status(400).json(genErrorObj(400, 'pagination-error', 'pageNo & size cannot be negative or zero.'));
    }

    if (size) {
        limit = size;
    }
    skip = (pageNo - 1) * limit;
    prev = pageNo - 1;
    next = pageNo + 1;
    try {
        const students = await Student
            .find(query)
            .populate('image')
            .skip(skip)
            .limit(limit);
        const totalStudents = await Student.countDocuments(query);
        const count = students.length;
        return res.json({
            success: true,
            data: {
                totalStudents,
                count,
                cureentPage: pageNo,
                totalPages: Math.ceil(totalStudents / limit),
                prev,
                next,
                students,
            }
        })
    } catch (err) {
        return res.status(500).json(genErrorObj(500, 'admin/students/internal-error', err.message));
    }
});

/**
 * @GET - /admin/students
 */
router.get('/students/:id', adminAuth, async (req, res) => {
    if (!isMongoId(req.params.id)) {
        return res.status(400).json(genErrorObj(400, 'admin/students/invalid-id', 'Please Enter Valid Id to get the students'));
    }

    try {
        const foundStudent = await Student.findOne({ _id: req.params.id }).populate('image');
        if (!foundStudent) {
            return res.status(404).json(genErrorObj(404, 'admin/students/not-found', 'Student Not Found'));
        }

        return res.json({
            success: true,
            student: foundStudent
        });
    } catch (err) {
        return res.status(500).json(genErrorObj(500, 'admin/students/internal-error', err.message));
    }
});

/**
 * @PUT - /admin/students/:id
 * UPDATE THE STUDENT
 */
router.put('/students/:id', adminAuth, async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json(genErrorObj(400, 'admin/students/no-id', 'Please Enter Id to update the students'));
    }
    if (!isMongoId(req.params.id)) {
        return res.status(400).json(genErrorObj(400, 'admin/students/invalid-id', 'Please Enter Valid Id to update the students'));
    }

    if (req.body.email && !isEmail(req.body.email)) {
        return res.status(400).json(genErrorObj(400, 'admin/students/invalid-email', 'Please Enter Valid Email'));
    }

    try {
        const foundStudent = await Student.findOne({ _id: req.params.id });
        if (!foundStudent) {
            return res.status(400).json(genErrorObj(400, 'admin/students/not-found', 'Student You are trying to update does not exist.'));
        }

        const updatedStudent = await foundStudent.updateOne({
            $set: {
                ...req.body
            }
        });

        return res.json({
            success: true,
            updatedStudent
        })
    } catch (err) {
        return res.status(500).json(genErrorObj(500, 'admin/students/internal-error', err.message));
    }

});

/**
 * @DELETE - /admin/students/:id
 */
router.delete('/students/:id', adminAuth, async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json(genErrorObj(400, 'admin/students/no-id', 'Please Enter Id to delete the students'));
    }
    if (!isMongoId(req.params.id)) {
        return res.status(400).json(genErrorObj(400, 'admin/students/invalid-id', 'Please Enter Valid Id to delete the students'));
    }

    try {
        const foundStudent = await Student.findOne({ _id: req.params.id });
        if (!foundStudent) {
            return res.status(400).json(genErrorObj(400, 'admin/students/not-found', 'Student You are trying to update does not exist.'));
        }

        const deletedStudent = await foundStudent.remove();
        return res.json({
            success: true,
            student: deletedStudent
        });
    } catch (err) {
        return res.status(500).json(genErrorObj(500, 'admin/students/internal-error', err.message));
    }
});


// Export Router
export default router;