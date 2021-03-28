const mongoose = require('mongoose')

const CommandSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  projects: [
    {
      type: mongoose.ObjectId,
      ref: 'Project',
      autopopulate: true,
    },
  ],
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
})

CommandSchema.set('toJSON', {
  virtuals: true,
})
CommandSchema.plugin(require('mongoose-autopopulate'))

const Command = mongoose.model('Command', CommandSchema)

module.exports = Command
