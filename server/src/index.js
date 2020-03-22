import './db/db';
// Third Party Modules
import express from 'express';
import cors from 'cors';
// Custom Module Files
import users from './routes/users';
import admin from './routes/admin';
import students from './routes/students';
import upload from './routes/upload';
import email from './routes/email';
// App Initialize
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    setTimeout(() => {
        next();
    }, 1000);
});
// Routes

// Assign Routes
app.use('/users', users);
app.use('/students', students);
app.use('/admin', admin);
app.use('/upload', upload);
app.use('/email', email);
// Server Listen
app.listen(process.env.PORT, () => {
    console.log('Server Up At ' + process.env.PORT);
});