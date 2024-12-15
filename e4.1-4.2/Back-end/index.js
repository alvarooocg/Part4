const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { title } = require('process')

require('dotenv').config()

const blogSchema = new mongoose.Schema({
  id: String,
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
    .then(result => 
      console.log('Connected to MongoDB')
    )
    .catch(err => 
      console.log('Error connecting to MongoDB:', err.message)
    )

app.use(cors())
app.use(express.json())

app.use(express.static('dist'))

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.get('/api/blogs/:id', (request, response) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
          response.status(404).send({ error: 'Not found' })
      }
    })
    .catch(err => console.log())
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.put('/api/blogs/:id', (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => response.json(updatedBlog))
    .catch(err => console.log("ERROR => " + err))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})