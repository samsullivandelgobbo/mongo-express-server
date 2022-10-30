const mongoose = require('mongoose')

const vehicleSchema = mongoose.Schema({
  stockNum: {
    type: String,
    required: true,
    unique: true
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true
  },
  vin: {
    type: String,
  },
  odometer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dateIn: {
    type: Date,
    default: Date.now,
  },
  dateOut: {
    type: Date
  },
  specs: {
    engine: String,
    fuel: String,
    drivetrain: String,
    platform: String,
    transmission: String,
  },
  location: {
    String
  },
  notes: {
    type: String,
    maxlength: 200,
  },
  photos: [{
      type: String,
  }],
  sold: {
    type: Boolean,
    required: true,
    default: false
  },
  customer: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    default: null
  }
})

module.exports = mongoose.model("Vehicle", vehicleSchema)