const bcrypt = require('bcrypt')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Logger = require('../utils/logger')

userRouter.post('/', async (request, response, next) => {
  try {
    response.status(400).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = userRouter