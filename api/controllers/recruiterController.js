const Recruiter = require('../models/recruiterModel.js');

// Create a new Recruiter
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Recruiter body can not be empty."
        });
    }

    // Create a Recruiter
    const recruiter = new Recruiter({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        skills: req.body.skills,
        email: req.body.email,
        seniority: req.body.seniority
    });

    // Save Recruiter in the database
    recruiter.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the recruiter."
        });
    });
};

// Retrieve and return all recruiters from the database.
exports.findAll = (req, res) => {
    Recruiter.find()
        .then(recruiters => {
            res.send(recruiters);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving recruiters."
        });
    });
};

// Find a single recruiter with a recruiterId
exports.findOne = (req, res) => {
    Recruiter.findById(req.params.recruiterId)
        .then(recruiter => {
            if (!recruiter) {
                return res.status(404).send({
                    message: "Recruiter not found with id " + req.params.recruiterId
                });
            }
            res.send(recruiter);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Recruiter not found with id " + req.params.recruiterId
            });
        }
        return res.status(500).send({
            message: "Error retrieving recruiter with id " + req.params.recruiterId
        });
    });
};

// Update a recruiter identified by the recruiterId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Recruiter content can not be empty"
        });
    }

    // Find recruiter and update it with the request body
    Recruiter.findByIdAndUpdate(req.params.recruiterId,
        {$set: req.body}
        , {new: true})
        .then(recruiter => {
            if (!recruiter) {
                return res.status(404).send({
                    message: "Recruiter not found with id " + req.params.recruiterId
                });
            }
            res.send(recruiter);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Recruiter not found with id " + req.params.recruiterId
            });
        }
        return res.status(500).send({
            message: "Error updating recruiter with id " + req.params.recruiterId
        });
    });
};

// Delete a recruiter with the specified recruiterId in the request
exports.delete = (req, res) => {
    Recruiter.findByIdAndRemove(req.params.recruiterId)
        .then(recruiter => {
            if (!recruiter) {
                return res.status(404).send({
                    message: "Recruiter not found with id " + req.params.recruiterId
                });
            }
            res.send({message: "Recruiter deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Recruiter not found with id " + req.params.recruiterId
            });
        }
        return res.status(500).send({
            message: "Could not delete recruiter with id " + req.params.recruiterId
        });
    });
};

