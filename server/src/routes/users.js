// Third Party Modules
import express from 'express';
import { isEmail } from 'validator';
// Custom Module Files
import { genErrorObj } from '../utils/utils';
import User from '../models/User';
import userAuth from '../middleware/userAuth';
// Initialize Router
const router = express.Router();

// Routes

/**
 * @POST - /users
 * Register A New User
 */
router.post('/', async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json(genErrorObj(400, 'user/name-missing', 'Please Enter Name'));
    }
    if (!req.body.email) {
        return res.status(400).json(genErrorObj(400, 'user/email-missing', 'Please Enter Email'));
    }
    if (!isEmail(req.body.email)) {
        return res.status(400).json(genErrorObj(400, 'user/email-invalid', 'Please Enter Valid Email'))
    }
    if (!req.body.password) {
        return res.status(400).json(genErrorObj(400, 'user/password-missing', 'Please Enter Password'));
    }
    if (req.body.password.length < 6) {
        return res.status(400).json(genErrorObj(400, 'user/password-short', 'Password Too Short'));
    }

    try {
        const foundUser = await User.findOne({ email: req.body.email });
        if (foundUser) {
            throw new Error('User Already Taken');
        }
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        const createdUser = await newUser.save();
        const token = createdUser.generateAuthToken();
        return res.header('Authorization', token).json({
            success: true,
            data: {
                createdUser,
                token
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json(genErrorObj(400, 'user/internal-error', err.message));
    }
});

/**
 * @POST - /users/login
 * LOGIN USER 
 */
router.post('/login', async (req, res) => {
    if (!req.body.email) {
        return res.status(400).json(genErrorObj(400, 'user/email-missing', 'Please Enter Email'));
    }
    if (!isEmail(req.body.email)) {
        return res.status(400).json(genErrorObj(400, 'user/email-invalid', 'Please Enter Valid Email'))
    }
    if (!req.body.password) {
        return res.status(400).json(genErrorObj(400, 'user/password-missing', 'Please Enter Password'));
    }

    try {
        const foundUser = await User.findOne({ email: req.body.email });
        if (!foundUser) {
            return res.status(404).json(genErrorObj(404, 'user/user-not-found', 'User With this email is not registered'));
        }

        const isMatch = await foundUser.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(400).json(genErrorObj(404, 'user/password-incorrect', 'Password Incorrect'));
        }

        const token = foundUser.generateAuthToken();
        return res.header('Authorization', token).json({
            success: true,
            data: {
                user: foundUser,
                token
            }
        });
    } catch (err) {
        console.log('kora',err);
        return res.status(400).json(genErrorObj(400, 'user/internal-error', err));
    }
});

/**
 * @GET - /users/me
 * GET PROFILE OF USER
 */
router.get('/me', userAuth, async (req, res) => {
    return res.json({
        user: req.user
    });
});

// Export Router
export default router;