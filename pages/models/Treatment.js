const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['topical', 'oral', 'procedure', 'lifestyle'],
    required: true
  },
  category: {
    type: String,
    enum: ['OTC', 'prescription', 'professional', 'natural'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  activeIngredients: [String],
  howItWorks: String,
  application: String,
  benefits: [String],
  sideEffects: [String],
  suitableFor: [{
    type: String,
    enum: ['comedonal', 'inflammatory', 'cystic', 'all']
  }],
  priceRange: {
    type: String,
    enum: ['low', 'medium', 'high', 'very-high']
  },
  effectiveness: {
    type: String,
    enum: ['low', 'medium', 'high', 'very-high']
  },
  timeToResults: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Treatment', treatmentSchema);