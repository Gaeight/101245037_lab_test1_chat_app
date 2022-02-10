const mongoose = require('mongoose')
const Schema = mongoose.Schema

const privateMessageSchema = new Schema ({
    from_user: {
        type: String,
        required: true,
        lowercase: true
    },
    room: {
        type: String,
        required: true,
        lowercase: true
    },
    message: {
        type: String,
        required: true,
        lowercase: true
    },
    date_sent: {
        type: Date,
        default: Date.now,
    }
})

const privateDM = mongoose.model('GroupDM', privateMessageSchema)
module.exports = privateDM