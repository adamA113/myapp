const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Minimum password length is 6 characters']
    }

}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = User;