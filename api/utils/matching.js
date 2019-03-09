var matchingConfig = require('../../config/config.js');


// Function to get the number of matching occurrences of strings in two arrays.
const matchingString = exports.matchingStrings = (stringArray1,stringArray2) => {
    let matchingStrings = 0;
    for(let i in stringArray1){
       for(let j in stringArray2){
           if(stringArray1[i].toLowerCase().trim()===stringArray2[j].toLowerCase().trim()){
               matchingStrings+=1;
           }
       }
    }
    return matchingStrings;
};

// Function to get the score of matching skills.
exports.matchingSkills = (recruiterSkills,positionsSkills) => {
    return (matchingString(recruiterSkills,positionsSkills)/positionsSkills.length)*matchingConfig.skills;
};

exports.matchingScore = (random,match,seniority) => {

};