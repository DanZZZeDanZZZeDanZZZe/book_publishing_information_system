const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  patronymic: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  books: [
    {
      type: mongoose.ObjectId,
      ref: 'Book',
      autopopulate: true,
    },
  ],
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
})

AuthorSchema.set('toJSON', {
  virtuals: true,
})
AuthorSchema.plugin(require('mongoose-autopopulate'))

const Author = mongoose.model('Author', AuthorSchema)

module.exports = Author
