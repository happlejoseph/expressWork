

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    phone: {
        type: String,
    },

    password: {
        type: String,
    },

    role: {
        type: String,
        enum: ['user', 'admin', 'manager']
    },
}, {timestamps: true})

const User = mongoose.model('userData', userSchema)

export default User