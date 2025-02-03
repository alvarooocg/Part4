const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})    
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
    const blog = new Blog(request.body)

    if (!blog.title || !blog.url) {
        return response.status(400).json({ error: 'Title or url missing' })
    }

    const newBlog = await blog.save()
    response.status(201).json(newBlog)
})
  
blogsRouter.put('/:id', (request, response, next) => {
   const body = request.body
 
   const blog = {
     title: body.title,
     author: body.author,
     url: body.url,
     likes: body.likes
   }
 
   Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
     .then(updatedBlog => response.json(updatedBlog))
     .catch(err => next(err))
})

module.exports = blogsRouter