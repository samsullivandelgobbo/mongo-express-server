const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  name: {
    first: {
      type: String,
    },
    last: {
      type: String,
    },
  },
  phoneNumber: {
    type: String,
  },
  favorites: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Vehicle",
    },
  ],
  creditScore: {
    type: Number,
  },
  income: {
    type: Number,
  },
  age: {
    type: Number,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  profilePic: {
    type: String,
  },
  authSource: {
    type: String,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  messages: {
    type: mongoose.Types.ObjectId,
    ref: "Message",
  },
  personalKey: {
    type: String,
    required: true,
    unique: true,
    default: null,
  },
})

module.exports = mongoose.model("User", userSchema)
