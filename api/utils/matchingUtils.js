const matchingConfig = require('../../config/config.js');


// Retrieve the number of matching occurrences of strings in two arrays.
const matchingString = exports.matchingStrings = (stringArray1,stringArray2) => {
    var matchingStrings = 0;
    for(var i = 0; i < stringArray1.length; i++){
        for(var j = 0; j < stringArray2.length; j++){
            if(stringArray1[i].trim().toLowerCase()===stringArray2[j].trim().toLowerCase()) {
                matchingStrings += 1;
            }
        }
    }
    return matchingStrings;
};

// Function to get the score of matching skills.
const matchingSkillsScore = exports.matchingSkillsScore = (recruiterSkills, positionSkills) => {
    return (matchingString(recruiterSkills,positionSkills)/positionSkills.length)*matchingConfig.skills;
};

// Function to get the score of seniority with the recruiter seniority as input.
const seniorityScore = exports.seniorityScore = (seniority,maxSeniority) => {
    return seniority*matchingConfig.seniority/maxSeniority;
};

// Function to get the score of randomization.
const randomScore = exports.randomScore = () => {
    return Math.random()*matchingConfig.random;
};

// Function to get the matching score.
const matchingScore = exports.matchingScore = (recruiterSkills,positionSkills,seniority,maxSeniority) => {
    return matchingSkillsScore(recruiterSkills,positionSkills)+seniorityScore(seniority,maxSeniority)+randomScore()
};

// Function to get recruiters with their matching scores from relevant JSON tables and get the score.
exports.matchingScoreRecruitersTable = (recruitersTable, positionTable) => {
    // Define the array of skills for the position
    var positionSkills = positionTable.skills;

    // Define maxSeniority to weight the seniority score.
    var maxSeniority = 0;
    for (var i in recruitersTable){
        if(recruitersTable[i].seniority>maxSeniority){
            maxSeniority=recruitersTable[i].seniority
        }
    }

    // Retrieve the score of each recruiter.
    for(var i in recruitersTable){
        var seniority = recruitersTable[i].seniority;
        var recruiterSkills = recruitersTable[i].skills;
        var recruiterScore = matchingScore(recruiterSkills,positionSkills,seniority,maxSeniority);
        // Adding the score to the recruitersTable.
        recruitersTable[i].matchingScore=recruiterScore;
    }
    return recruitersTable;
};