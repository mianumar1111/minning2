const mongoose = require('mongoose');

const minningSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    role: { type: String, default: 'user' },
    refer: { type: Array, default: [] },
    totalInvestment:{type: Number, default: 0},
    invested:{type: Number, default: 0},
    orderNo:{type: Number, default: 0},
    isSubmit:{type: Boolean, default: false},
    
});


const MinningModel = mongoose.model('MinningData', minningSchema);

module.exports = MinningModel;
