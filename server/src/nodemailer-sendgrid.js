import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

const options = {
    auth: {
        api_user: process.env.SENDGRID_USERNAME,
        api_key: process.env.SENDGRID_PASSWORD
    }
};

export default nodemailer.createTransport(sgTransport(options));