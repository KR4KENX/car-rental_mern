const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    isAdmin: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: new Date(),
    },
})

module.exports = mongoose.model('users', UserSchema)