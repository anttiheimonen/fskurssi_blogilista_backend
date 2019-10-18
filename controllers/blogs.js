const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
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
  const userID = '5da98d7eb27c671aee529654'
  const body = request.body
  const user = await User.findById(userID)

  const blog = new Blog({
    title: body.title,
    authot: body.author,
    url: body.url,
    user: user.id
  })
  // const blog = new Blog(request.body)
  try {
    const savedBlog = await blog.save()
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