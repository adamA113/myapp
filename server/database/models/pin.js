const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pinSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;