const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  book: {
    autopopulate: true,
    type: mongoose.ObjectId,
    ref: 'Book',
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
})

ProjectSchema.set('toJSON', {
  virtuals: true,
})

ProjectSchema.plugin(require('mongoose-autopopulate'))

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
