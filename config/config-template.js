/**
 * Config file
 */

// Matching function config
    // "random" is to randomize the match, "skills" is to weight skill match, "seniority" is to weight number of previously matched applicants.
const random = 0.20;
const skills = 0.70;
const seniority = 0.10;

// Setting up apiKey for API Key
const apiKey = 'kPYRCC579HzwQjuKZwRd';

// Database config
module.exports = {
    url: 'mongodb://localhost:27017/recruitR_DB',
    random,
    skills,
    seniority,
    apiKey
};


