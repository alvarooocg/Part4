const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    if (!username) {
        return response.status(400).json({ error: 'UserName is required' })
    }

    if (!name) {
        return response.status(400).json({ error: 'Name is required' })
    }

    if (!password) {
        return response.status(400).json({ error: 'Password is required' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    try{
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch(error) {
        return response.status(400).json({error: error.message})
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    const filteredUsers = users.map(user => ({
        id: user._id,
        name: user.name,
        username: user.username,
        blogs: user.blogs
    }))
    response.json(filteredUsers)
})

module.exports = usersRouter