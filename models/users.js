const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    username: {
        type: String,
        required: [true, "Please enter username"],
        lowercase: true
    },
    firstname: {
        type: String,
        required: [true, "Please enter first name"],
        lowercase: true
    },
    lastname: {
        type: String,
        required: [true, "Please enter last name"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        lowercase: true
    },
    createon: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User