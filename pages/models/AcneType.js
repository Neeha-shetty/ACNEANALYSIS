const mongoose = require('mongoose');

const acneTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  symptoms: [String],
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe'],
    required: true
  },
  commonLocations: [String],
  imageUrl: String,
  recommendedTreatments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Treatment'
  }],
  do: [String],
  dont: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AcneType', acneTypeSchema);