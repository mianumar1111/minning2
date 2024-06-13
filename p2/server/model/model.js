const mongoose = require('mongoose');

const minningSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 },
    level: { type: Number, default: 0 }
});

const MinningModel = mongoose.model('MinningData', minningSchema);

module.exports = MinningModel;
