const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    price: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    occupied: {
        type: Array,
        default: []
    },
    img: {
        type: mongoose.SchemaTypes.String,
    }
})

module.exports = mongoose.model('cars', CarSchema)