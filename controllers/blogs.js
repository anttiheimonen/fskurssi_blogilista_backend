const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Logger = require('../utils/logger')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if(request.token === null) {
    return response.status(401).json({error: 'Token is missing'})
  }
  Logger.info(request.token)

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    Logger.info(decodedToken)
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user.id
    })

    const savedBlog = await blog.save()
    Logger.info('New blog created')
    // Add blog's id to users record
    const blogs = user.blogs.concat(savedBlog._id)
    await User.findByIdAndUpdate(user._id,
      {
        blogs: blogs
      })
    Logger.info('Blog id saved to user record')
    response.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  // This part is repeated in an other route. Could be in a middleware?
  if(request.token === null) {
    return response.status(401).json({error: 'Token is missing'})
  }
  Logger.info(request.token)

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)
    Logger.info(blog)
    if (blog === null) {
      // Blog does does not exist.
      return response.status(204).end()
    }

    // Check that requester is the owner of blog and delete
    if (blog.user.toString() !== decodedToken.id.toString()){
      Logger.info('Unauthorized request')
      return response.status(401).json({error: 'Unauthorized request'})
    } else {
      Logger.info('Deleting blog')
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }

  }catch (exception) {
    next(exception)
  }
})

// Modify number of likes
blogsRouter.put('/:id', async (request, response, next) => {
  if (request.body.likes === null || request.body.likes == undefined) {
    // Could this be moved to Mongoose's validation?
    Logger.info('Likes is null or undefined')
    return response.status(400).end()
  }
  const changedBlog = {
    likes: request.body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      changedBlog,
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
    response.json(updatedBlog.toJSON())
  }catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter