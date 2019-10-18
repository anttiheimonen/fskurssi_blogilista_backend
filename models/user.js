const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username:  {
    type: String,
    minlenght: 2,
    required: true,
    unique: true
  },
  passwordHash:  {
    type: String,
    minlenght: 2,
    required: true
  },
  name:  {
    type: String,
    minlenght: 2,
    required: true
  }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)