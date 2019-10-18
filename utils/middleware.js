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

  if (error.name === 'CastError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

// Extracts token from bearer authorization and places it to
// request.token. If request does not have authorization,
// request token is set to null.
const tokenExtractor = (request, response, next) => {
  request.token = null
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token =  authorization.substring(7)
  }
  next()
}

module.exports = {
  requestLogger, unknownEndpoint, errorHandler, tokenExtractor
}