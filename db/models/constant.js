/**
 * Created by mercuso on 23.12.17.
 */
const mongoose = require('mongoose');

let ConstantSchema = new mongoose.Schema({
  name: String,
  value: Number,
  dimension: String
});

module.exports = mongoose.model('Constant', ConstantSchema);