const mongoose = require('mongoose');

const minningSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  role: { type: String, default: 'user' },
  refer_by: { type: String, default: '' },
  refer: { type: Array, default: [] },
  T_invested: { type: Number, default: 0 },
  exchange: { type: String, default: 'No Order' },
  invested: { type: Number, default: 0 },
  order_placed: { type: String, default: 'No' },
  orderNo: { type: Number, default: 0 },
  isSubmit: { type: Boolean, default: false },
});

const MinningModel = mongoose.model('MinningData', minningSchema);

module.exports = MinningModel;
