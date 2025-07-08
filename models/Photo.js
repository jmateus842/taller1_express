const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  descripcion: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Photo', photoSchema); 