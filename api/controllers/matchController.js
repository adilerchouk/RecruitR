const Match = require('../models/matchModel.js');
const Position = require('../models/positionModel.js');
const Recruiter = require('../models/recruiterModel.js');
const matching = require('../utils/matchingUtils.js');
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
exports.update = async (req, res, next) => {
    // Validate Request
    if (!req.body.recruiterId) {
        return res.status(400).send({
            message: "Match recruiterId can not be empty"
        });
    }
    try {
        // Declare promise
        var myPromise = () => {
            return new Promise((resolve, reject) => {
                // Retrieve
                Match.findByIdAndUpdate(req.params.matchId,
                    {
                        $set:
                            {
                                recruiterId:
                                req.body.recruiterId
                            }
                    }, {new: true})
                // Increase the seniority of the recruiter after matching the recruiter.
                    .then(function (match) {
                        Recruiter.findByIdAndUpdate(match.recruiterId,
                            {
                                $inc:
                                    {
                                        seniority:
                                        +1
                                    }
                            })
                            .then(function (result) {
                                resolve(result);
                            });
                    });
            })
        };

        //await myPromise
        var result = await myPromise();
        //continue execution
        res.send(result);


    } catch (e) {
        next(e)
    }
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

// Retrieve matching recruiters regarding the skills.
// The added value "score" in their documents allow for sorting by element on Front-End.
exports.findMatchingRecruiters = async (req, res, next) => {
    try {
        // Declare promise
        var myPromise = () => {
            return new Promise((resolve, reject) => {
                // Retrieve recruiters data.
                Recruiter.find()
                    .then(function (recruitersTable) {
                        Match.findById(req.params.matchId)
                            .then(function (matchTable) {
                                Position.findById(matchTable.positionId)
                                    .then(function (positionTable) {
                                        result = matching.matchingScoreRecruitersTable(recruitersTable, positionTable);
                                        console.log(result);
                                        resolve(result);
                                    });
                            });
                    });
            });
        };

        //await myPromise
        var result = await myPromise();
        //continue execution
        res.json(result);


    } catch (e) {
        next(e)
    }
};
