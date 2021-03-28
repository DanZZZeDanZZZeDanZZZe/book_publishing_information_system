const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  authors: [
    {
      autopopulate: true,
      type: mongoose.ObjectId,
      ref: 'Author',
    },
  ],
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
})

BookSchema.set('toJSON', {
  virtuals: true,
})

BookSchema.plugin(require('mongoose-autopopulate'))

const Book = mongoose.model('Book', BookSchema)

module.exports = Book
