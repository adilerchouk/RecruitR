const assert = require('chai').assert;
const matching = require('../api/utils/matchingUtils.js');
const matchingConfig = require('../config/config.js');

// Test of matchingStrings
describe('matchingStrings',function () {
    it('Function should return 2',function(){
        let stringArray1 = ["Premier","Deuxième"];
        let stringArray2 = ["Premier","Deuxième"];
        assert.equal(matching.matchingStrings(stringArray1,stringArray2),2)
    });
});

// Test of matchingStrings with two different length Strings
describe('matchingStrings != length',function () {
    it('Function should return 2',function(){
        let stringArray1 = ["Premier","Troisième"];
        let stringArray2 = ["Premier","Deuxième","Troisième"];
        assert.equal(matching.matchingStrings(stringArray1,stringArray2),2)
    });
});

// Test of matchingStrings with two different length Strings
describe('matchingStrings != length',function () {
    it('Function should return 2',function(){
        let stringArray1 = ["Premier","Deuxième","Troisième"];
        let stringArray2 = ["Premier","Deuxième"];
        assert.equal(matching.matchingStrings(stringArray1,stringArray2),2)
    });
});

// Test of matchingStrings with not all strings matching
describe('matchingStrings',function () {
    it('Function should return 1',function(){
        let stringArray1 = ["Premier","Deuxième"];
        let stringArray2 = ["Premier","Troisième"];
        assert.equal(matching.matchingStrings(stringArray1,stringArray2),1)
    });
});

// Test of matching strings case sensitive
describe('matchingStrings case sensitive',function () {
    it('Function should return 1',function(){
        let stringArray1 = ["Premier","Deuxième"];
        let stringArray2 = ["premier","Troisième"];
        assert.equal(matching.matchingStrings(stringArray1,stringArray2),1)
    });
});

// Test of matching strings trimmed (space before or after one String)
describe('matchingStrings trimmed',function () {
    it('Function should return 1',function(){
        let stringArray1 = ["Premier","Deuxième"];
        let stringArray2 = ["  Premier","Troisième"];
        assert.equal(matching.matchingStrings(stringArray1,stringArray2),1)
    });
});

// Test of the score between 0 and 1 for matching Skills with weight defined in config.
describe('matchingSkillsScore',function () {
    it('Function should return 0.5*matchingConfig.skills',function(){
        let stringArray1 = ["Premier","Deuxième"];
        let stringArray2 = ["Premier","Troisième"];
        const result = 0.5*matchingConfig.skills;
        assert.equal(matching.matchingSkillsScore(stringArray1,stringArray2),result)
    });
});