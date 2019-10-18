const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username:  {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  passwordHash:  {
    type: String,
    required: true
  },
  name:  {
    type: String,
    minlength: 2,
    required: true
  }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)