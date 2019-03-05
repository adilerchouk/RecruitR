module.exports = (app) => {
    const recruiters = require('../controllers/recruiterController.js');

    // Create a new Recruiter
    app.post('/recruiters', recruiters.create);

    // Retrieve all Recruiters
    app.get('/recruiters', recruiters.findAll);

    // Retrieve a single Recruiter with recruiterId
    app.get('/recruiters/:recruiterId', recruiters.findOne);

    // Update a Recruiter with recruiterId
    app.put('/recruiters/:recruiterId', recruiters.update);

    // Delete a Recruiter with recruiterId
    app.delete('/recruiters/:recruiterId', recruiters.delete);
};