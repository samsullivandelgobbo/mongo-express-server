const mongoose = require('mongoose')
const messageSchema = mongoose.Schema({
  users: {
    fromUser: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    toUser: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },
  },
  message: {
    type: String,
    required: true,
    maxLength: 255
  },
  reply: {
    type: mongoose.Types.ObjectId,
    ref: 'Message'
  },
  vehicle: {
    type: mongoose.Types.ObjectId,
    ref: 'Vehicle'
  },
  dateSent: {
    type: Date,
    default: Date.now,
    required: true
  },
})

module.exports = mongoose.model("Message", messageSchema)