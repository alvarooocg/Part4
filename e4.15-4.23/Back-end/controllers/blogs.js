const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const user = await User.findById("67b2e7d9e6c543b5a5d69b78")
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

blogsRouter.delete('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndDelete(request.params.id, blog)
    .then(response.json(blog))
    .catch(err => next(err))
})

module.exports = blogsRouter