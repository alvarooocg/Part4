const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: String,
    username: {
        type: String,
        unique: [true, 'Username must be unique'],
        required: [true, 'Username is required'],
        minlength: [3, 'Username must be at least 3 characters long']
    },
    name: String,
    passwordHash: {
        type: String,
        required: [true, 'Password is required']
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)