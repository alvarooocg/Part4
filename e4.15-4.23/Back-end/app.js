const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGO_URI)

const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl)
    .then(result => 
      logger.info('Connected to MongoDB')
    )
    .catch(err => 
      logger.error('Error connecting to MongoDB:', err.message)
    )

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

// El extractor de token debe ir antes de los routers que lo usan
app.use(middleware.tokenExtractor)

// Routers
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// Middlewares para endpoints desconocidos y errores
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app