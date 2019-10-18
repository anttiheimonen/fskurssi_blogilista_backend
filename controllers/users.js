const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Logger = require('../utils/logger')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User( {
      username: body.username,
      name: body.name,
      passwordHash: passwordHash
    })
    Logger.info('New user: \n' + user)

    const savedUser = await user.save()
    response.json(savedUser.toJSON())
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (request, response, next) => {
  try {
    const user = await User.find({})
    response.json(user.map(user => user.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter