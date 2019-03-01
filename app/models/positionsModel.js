const mongoose = require('mongoose');

const PositionSchema = mongoose.Schema({
    name: String,
    tags: [String],
    description: String,
    status: String
});

module.exports = mongoose.model('Position', PositionSchema);