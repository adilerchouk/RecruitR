const Applicant = require('../models/applicantModel.js');

// Create a new applicant
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Applicant body can not be empty."
        });
    }

    // Create an applicant
    const applicant = new Applicant({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        linkedIn: req.body.linkedIn,
        angelList: req.body.angelList,
        skills: req.body.skills,
        applications: req.body.applications
    });

    // Save applicant in the database
    applicant.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the applicant."
        });
    });
};

// Retrieve and return all applicants from the database.
exports.findAll = (req, res) => {
    Applicant.find()
        .then(applicants => {
            res.send(applicants);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving applicants."
        });
    });
};

// Find a single applicant with a applicantId
exports.findOne = (req, res) => {
    Applicant.findById(req.params.applicantId)
        .then(applicant => {
            if (!applicant) {
                return res.status(404).send({
                    message: "Applicant not found with id " + req.params.applicantId
                });
            }
            res.send(applicant);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Applicant not found with id " + req.params.applicantId
            });
        }
        return res.status(500).send({
            message: "Error retrieving applicant with id " + req.params.applicantId
        });
    });
};

// Update a applicant identified by the applicantId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Applicant content can not be empty"
        });
    }

    // Find position and update it with the request body
    Applicant.findByIdAndUpdate(req.params.applicantId,
        {$set: req.body}
        , {new: true})
        .then(applicant => {
            if (!applicant) {
                return res.status(404).send({
                    message: "Applicant not found with id " + req.params.applicantId
                });
            }
            res.send(applicant);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Applicant not found with id " + req.params.applicantId
            });
        }
        return res.status(500).send({
            message: "Error updating applicant with id " + req.params.applicantId
        });
    });
};

// Delete a applicant with the specified applicantId in the request
exports.delete = (req, res) => {
    Applicant.findByIdAndRemove(req.params.applicantId)
        .then(applicant => {
            if (!applicant) {
                return res.status(404).send({
                    message: "Applicant not found with id " + req.params.applicantId
                });
            }
            res.send({message: "Applicant deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Applicant not found with id " + req.params.applicantId
            });
        }
        return res.status(500).send({
            message: "Could not delete applicant with id " + req.params.applicantId
        });
    });
};

// Retrieve Applicants with positionId

exports.findAllApplicantsByPositionId = (req, res) => {
    var positionId = req.path.substring(11,35);
    Applicant.find({applications: positionId})
        .then(applicants => {
            res.send(applicants);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving applicants."
        });
    });
};
