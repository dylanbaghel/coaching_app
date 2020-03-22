import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    role: {
        type: String,
        default: 'student'
    }
});

UserSchema.methods.toJSON = function() {
    const userObject = this.toObject();

    return {
        ...userObject,
        password: null
    };
}

UserSchema.methods.generateAuthToken = function () {
    const payload = {
        _id: this._id,
        name: this.name,
        email: this.email,
        role: this.role
    }

    return jwt.sign(payload, process.env.JWT_SECRET);
}

UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.statics.findByToken = async function(token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foundUser = await this.findOne({ _id: decoded._id }).populate('image');
        if (!foundUser) {
            throw new Error('UnAuthorized Token');
        }

        return foundUser;
}

UserSchema.pre('save', async function () {
    try {
        if (this.isModified('password')) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
    } catch (err) {
        throw err;
    }
});

const User = mongoose.model('User', UserSchema);

export default User;