const mongoose = require('mongoose');

const patternSchema = new mongoose.Schema({
    colors: [String],
    posterLocation: String,
    country: String,
    region: String,
    city: String
}, { timestamps: true });

const patternModel = mongoose.model('Pattern', patternSchema);

module.exports = patternModel;