const mongoose = require('mongoose');

const pizzaSchema = mongoose.Schema({
  flavour: {type: String, required: true},
  size: {type: String, required: true},
  cash: {type: Boolean},
  delivery: {type: Boolean},
  created: {type: Date, default: Date.now}
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
