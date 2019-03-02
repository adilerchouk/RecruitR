const mongoose = require('mongoose');

// Define ApplicantSchema
const ApplicantSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        uppercase: true
    },
    linkedIn: String,
    angelList: String,
    skills: [String],
    applications: [String]
});

// Export the Applicant model
module.exports = mongoose.model('Applicant', ApplicantSchema);