const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define PositionSchema
const MatchSchema = mongoose.Schema({
    applicantId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    positionId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    recruiterId: Schema.Types.ObjectId
});

// Export the Position model
module.exports = mongoose.model('Match', MatchSchema);