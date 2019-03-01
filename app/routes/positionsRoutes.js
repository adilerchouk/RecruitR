module.exports = (app) => {
    const positions = require('../controllers/positionsController.js');

    // Create a new Position
    app.post('/positions', positions.create);

    // Retrieve all Positions
    app.get('/positions', positions.findAll);

    // Retrieve a single Position with poteId
    app.get('/positions/:positionId', positions.findOne);

    // Update a Position with positionId
    app.put('/positions/:positionId', positions.update);

    // Delete a Position with positionId
    app.delete('/positions/:positionId', positions.delete);
};