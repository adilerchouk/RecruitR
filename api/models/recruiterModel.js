const mongoose = require('mongoose');

// Define RecruiterSchema
const RecruiterSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    skills: [String],
    seniority: {
        type: Number,
        required: true,
        default: 0
    },
    matchingScore: Number
});

// Export the Position model
module.exports = mongoose.model('Recruiter', RecruiterSchema);