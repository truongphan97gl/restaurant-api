const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({

  text: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)
