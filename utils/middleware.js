const logger = require('./logger')

const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.path} ${req.body}`)
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
  requestLogger, unknownEndpoint, errorHandler
}