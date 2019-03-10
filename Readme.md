*This repo's a work in progress*

### What is this ?

This is a rather simple pet Project for a HR application that can do CRUD operations on documents stored in a MongoDB database.
The goal is to help recruitment process and manage candidates.

It has a matching function taking into account several parameters like skills, seniority and random which weights can be configured.

### What's needed

This API runs on node.js, and makes use of the following:

- [Express](https://github.com/visionmedia/express) - node.js framework that handles routing
- [MongoDB](http://mongodb.com) - NoSQL database that holds our data
- [Mongoose](http://mongoosejs.com/) - ODM (object data mapping) layer, translates your data into JavaScript objects so you can work with them easier.
- [Docco](http://ashkenas.com/docco/) - Quick-and-dirty documentation generator using comments.
- [Mocha](https://mochajs.org/) - Framework for asynchronous testing.
- [Chai](https://www.chaijs.com/) - Assertion library for node.

### Get started

Clone this project (or download the zip file), then run ```npm install``` to install the dependencies.

Next you'll want to create your own "config.js" file. There's a file in the project called "config-template.js" that you can copy to "config.js", and modify it to include the connection string to your database.

You can also modify the matching function configuration, the three variable are the weight of skills,  randomization and seniority.

The file will look like the one below. Just replace the dummy connection string with the real one you'll be using.


```
/**
 * Config file
 */

// Matching function config
    // "random" is to randomize the match, "skills" is to weight skill match, "seniority" is to weight number of previously matched applicants.
const random = 0.20;
const skills = 0.70;
const seniority = 0.10;

// Database config
module.exports = {
    url: 'mongodb://localhost:27017/recruitR_DB',
    random,
    skills,
    seniority
};

```

Now, startup up server with the command `node app.js`, and you should see the messages below:

	Server is listening on port 3000
    Successfully connected to the database

If you don't see those messages, double check the connection string to your database in your config file, and make sure the file is called "config.js" and not "config-template.js".

Also make sure you have started your mongo database with `mongod` in the terminal.

The quick documentation of the source code is available in the docs/ folder (Docco produces HTML files).

### The data

This project uses data about job positions, candidates, recruiters and it assumes that it's stored in a MongoDB database. Since I can't include a link to my dev database, I've pasted the same data here so you can toss it into your own (I called mine "recruitR_DB"), create your collections, and add the data.

Basically, you'll need four collections:

- positions
- applicants
- recruiters
- matches

Add the data below to each of those (all object have an "_id" property generated during POST):

```
positions:

[
    {
        "skills": [
            "IT",
            "Java",
            "MongoDB"
        ],
        "name": "Software developer",
        "description": "A software developer position",
        "status": "Available"
    },
    {
        "skills": [
            "HR",
            "Communication"
        ],
        "name": "HR Assistant",
        "description": "A HR assistant position",
        "status": "Available"
    },
    {
        "skills": [
            "IT",
            "Data",
            "MongoDB",
            "NLP
        ],
        "name": "Data scientist",
        "description": "A data scientist position",
        "status": "Available"
    }
]
```
```
applicants:

[
    {
        "skills": [
            "Management",
            "HR"
        ],
        "email": "email@company.com",
        "firstName": "John",
        "lastName": "DOE",
        "linkedIn": "https://linkedin.com/johndoe",
        "angelList": "johndoe12"
    },
    {
        "skills": [
            "IT",
            "Java"
        ],
        "email": "johnnyboe@company.com",
        "firstName": "Johnny",
        "lastName": "BOE",
        "linkedIn": "https://linkedin.com/johnnyboe",
        "angelList": "tomboe3"
    }
]
```

```
recruiters:

[
    {
        "skills": [
            "Data",
            "IT",
            "MongoDB"
        ],
        "email": "patricktimsit@company.com",
        "firstName": "Patrick",
        "lastName": "TIMSIT"
    },
    {
        "skills": [
            "IT",
            "Devops",
            "Programming"
        ],
        "firstName": "Johnny",
        "lastName": "DEPP",
        "email": "johnnydepp@company.com"
        }
]
```

```
matches:

[
    {
            "applicantId": "5c7eeb045555022718b84b01",
            "positionId": "5c7ee40753a0c7268062a682"
            "recruiterId": ""
    }
]
```