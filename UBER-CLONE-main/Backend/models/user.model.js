import mongoose from 'mongoose';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Email name must be at least 5 characters long']
    },

    password: {
        type: String,
        required: true,
        select: false // if we wearch user then this field will not show
    },

    socketId: {
        type: String
    }
}, { timestamps: true })


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET);
    return token
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

export default userModel;