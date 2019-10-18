const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Logger = require('../utils/logger')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

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
  const token = getTokenFrom(request)

  Logger.info(token)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
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
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }catch (exception) {
    next(exception)
  }
})

// Modify number of likes
blogsRouter.put('/:id', async (request, response, next) => {
  if (request.body.likes === null || request.body.likes == undefined) {
    // Could this be moved to Mongoose's validation?
    Logger.info('Likes is null or undefined')
    response.status(400).end()
    return
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