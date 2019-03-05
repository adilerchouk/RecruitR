const mongoose = require('mongoose');

// Define PositionSchema
const PositionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    skills: [String],
    description: String,
    status: String,
});

// Export the Position model
module.exports = mongoose.model('Position', PositionSchema);