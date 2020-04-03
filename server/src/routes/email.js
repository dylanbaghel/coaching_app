// Third Party Modules
import express from 'express';

// Custom Module Files
import mailer from '../nodemailer-sendgrid';
import userAuth from '../middleware/userAuth';
import { genErrorObj } from '../utils/utils';
// Initialize Router
const router = express();

// Routes
router.post('/', userAuth, (req, res) => {
    const { name, parentName, phone } = req.body;
    if (!name) {
        return res.status(400).json(genErrorObj(400, 'email/name-missing', 'Please Provide Name'));
    }
    if (!parentName) {
        return res.status(400).json(genErrorObj(400, 'email/parent-name-missing', 'Please Provide Parent Name'));
    }
    if (!phone) {
        return res.status(400).json(genErrorObj(400, 'email/phone-missing', 'Please Provide Phone Number'));
    }

    const email = {
        to: process.env.EMAIL_MAN,
        from: req.user.email,
        subject: 'Enquiry',
        html: `
            <h2>Name: ${name}</h2>
            <h3>Email: ${req.user.email}</h3>
            <h3>Guardian Name: ${parentName}</h3>
            <h3>Phone: ${phone}</h3>
        `
    };

    mailer.sendMail(email, (err, info) => {
        if (err) {
            return res.status(500).json(genErrorObj(500, 'email/remote-error', err.message));
        }

        return res.status(200).json({
            success: true,
            response: info
        });
    });
})


// Export Router
export default router;