const Match = require('../models/matchModel.js');
const Position = require('../models/positionModel.js');
const Recruiter = require('../models/recruiterModel.js');

// Create a new Match
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Position body can not be empty."
        });
    }

    // Create a Match
    const match = new Match({
        applicantId: req.body.applicantId,
        positionId: req.body.positionId,
        recruiterId: req.body.recruiterId
    });

    // Save Match in the database
    match.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the position."
        });
    });
};

// Retrieve and return all matches from the database.
exports.findAll = (req, res) => {
    Match.find()
        .then(matches => {
            res.send(matches);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving positions."
        });
    });
};

// Find a single Match with a matchId
exports.findOne = (req, res) => {
    Match.findById(req.params.matchId)
        .then(match => {
            if (!match) {
                return res.status(404).send({
                    message: "Match not found with id " + req.params.matchId
                });
            }
            res.send(match);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Match not found with id " + req.params.matchId
            });
        }
        return res.status(500).send({
            message: "Error retrieving position with id " + req.params.matchId
        });
    });
};

// Update a Match identified by the matchId in the request with the recruiterId
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.recruiterId) {
        return res.status(400).send({
            message: "Match recruiterId can not be empty"
        });
    }

    // Find Match and update it with the request body
    Match.findByIdAndUpdate(req.params.matchId,
        {$set: req.body.recruiterId}
        , {new: true})
        .then(match => {
            if (!match) {
                return res.status(404).send({
                    message: "Match not found with id " + req.params.matchId
                });
            }
            res.send(match);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Match not found with id " + req.params.matchId
            });
        }
        return res.status(500).send({
            message: "Error updating position with id " + req.params.matchId
        });
    });
};

// Delete a Match with the specified matchId in the request
exports.delete = (req, res) => {
    Match.findByIdAndRemove(req.params.matchId)
        .then(match => {
            if (!match) {
                return res.status(404).send({
                    message: "Match not found with id " + req.params.matchId
                });
            }
            res.send({message: "Match deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Match not found with id " + req.params.matchId
            });
        }
        return res.status(500).send({
            message: "Could not delete Match with id " + req.params.matchId
        });
    });
};

// Retrieve matching recruiters regarding the skills
exports.findMatchingRecruiters= (req, res) => {
        Position.find()
        .then(matches => {
            res.send(matches);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving positions."
        });
    });
};

