const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    id: String,
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        required: [true, 'User is required'],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
  
  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

        if (returnedObject.user && typeof returnedObject.user === 'object') {
            returnedObject.user = {
                id: returnedObject.user._id,
                username: returnedObject.user.username,
                name: returnedObject.user.name
            }
        }
    }
})

module.exports = mongoose.model('Blog', blogSchema)