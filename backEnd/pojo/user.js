const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true

    },
    last_name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
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
    user_type: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);


