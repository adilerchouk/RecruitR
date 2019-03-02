const Position = require('../models/positionModel.js');

// Create a new Position
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Position body can not be empty."
        });
    }

    // Create a Position
    const position = new Position({
        name: req.body.name,
        skills: req.body.skills,
        description: req.body.description,
        status: req.body.status
    });

    // Save Position in the database
    position.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the position."
        });
    });
};

// Retrieve and return all positions from the database.
exports.findAll = (req, res) => {
    Position.find()
        .then(positions => {
            res.send(positions);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving positions."
        });
    });
};

// Find a single position with a positionId
exports.findOne = (req, res) => {
    Position.findById(req.params.positionId)
        .then(position => {
            if (!position) {
                return res.status(404).send({
                    message: "Position not found with id " + req.params.positionId
                });
            }
            res.send(position);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Position not found with id " + req.params.positionId
            });
        }
        return res.status(500).send({
            message: "Error retrieving position with id " + req.params.positionId
        });
    });
};

// Update a position identified by the positionId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Position content can not be empty"
        });
    }

    // Find position and update it with the request body
    Position.findByIdAndUpdate(req.params.positionId,
        {$set: req.body}
        , {new: true})
        .then(position => {
            if (!position) {
                return res.status(404).send({
                    message: "Position not found with id " + req.params.positionId
                });
            }
            res.send(position);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Position not found with id " + req.params.positionId
            });
        }
        return res.status(500).send({
            message: "Error updating position with id " + req.params.positionId
        });
    });
};

// Delete a position with the specified positionId in the request
exports.delete = (req, res) => {
    Position.findByIdAndRemove(req.params.positionId)
        .then(position => {
            if (!position) {
                return res.status(404).send({
                    message: "Position not found with id " + req.params.positionId
                });
            }
            res.send({message: "Position deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Position not found with id " + req.params.positionId
            });
        }
        return res.status(500).send({
            message: "Could not delete position with id " + req.params.positionId
        });
    });
};
