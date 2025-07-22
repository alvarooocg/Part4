const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { error } = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')    
  response.json(blogs)
})
  
blogsRouter.get('/:id', (request, response, next) => {
   Blog.findById(request.params.id)
     .then(blog => {
       if (blog) {
         response.json(blog)
       } else {
          response.status(404).send({ error: 'Not found' })
       }
     })
     .catch(err => next(err))
})

/*

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

*/
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    // console.log(body.user.userId)
    if (!user) {
      return response.status(400).json({ error: 'User not found' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user._id // Asignar solo el ObjectId del usuario
    })

    if (!blog.title || !blog.url) {
      return response.status(400).json({ error: 'Title or url missing' })
    }

    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id) // Agregar el ObjectId del blog al usuario
    await user.save()

    const populatedBlog = await Blog.findById(newBlog._id).populate('user', { username: 1, name: 1, id: 1 })
    response.status(201).json(populatedBlog)
  } catch (err) {
    next(err)
  }
})
  
blogsRouter.put('/:id', (request, response, next) => {
   const body = request.body
 
   const blog = {
     title: body.title,
     author: body.author,
     url: body.url,
     likes: body.likes
   }
 
   Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })  
     .then(updatedBlog => response.json(updatedBlog))
     .catch(err => next(err))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(400).json({ error: "token invalid" })
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(400).json({ error: 'User not found' })
    }

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(400).json({ error: 'Blog not found' })
    }

    // console.log("User id => " + user._id.toString())
    // console.log("Blog User id => " + blog.user.toString())

    if ( blog.user.toString() !== user._id.toString() ) {
      return response.status(400).json({ error: "user invalid" })
    }
    /*
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    */

    await Blog.findByIdAndDelete(request.params.id, blog)
      .then(response.json(blog))
      .catch(err => next(err))
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter