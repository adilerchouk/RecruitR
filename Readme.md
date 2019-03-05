*This repo's a work in progress*

### What is this ?

This is a rather simple pet Project for a HR application that can do CRUD operations on documents stored in a MongoDB database.
The goal is to help recruitment process and manage candidates

### What's needed

This API runs on node.js, and makes use of the following:

- [Express](https://github.com/visionmedia/express) - node.js framework that handles routing
- [MongoDB](http://mongodb.com) - NoSQL database that holds our data
- [Mongoose](http://mongoosejs.com/) - ODM (object data mapping) layer, translates your data into JavaScript objects so you can work with them easier.
- [Docco](http://ashkenas.com/docco/) - Quick-and-dirty documentation generator using comments.
### Get started

Clone this project (or download the zip file), then run ```npm install``` to install the dependencies.

Next you'll want to create your own "config.js" file. There's a file in the project called "config-template.js" that you can copy to "config-template.js", and modify it to include the connection string to your database.

The file will look like the one below. Just replace the dummy connection string with the real one you'll be using.


```
/**
* Config file for the API
*/
exports.db_url = 'mongodb://username:password@your-mongo-host.com/database-name';

```

Now, startup up server with the command `node app.js`, and you should see the messages below:

	Server is listening on port 3000
    Successfully connected to the database

If you don't see those messages, double check the connection string to your database in your config file, and make sure the file is called "config.js" and not "config-template.js".

The quick documentation of the source code is available in the docs/ folder (Docco produces HTML files).

### The data

This project uses data about job positions, users (candidates, HR and recruiter) and it assumes that it's stored in a MongoDB database. Since I can't include a link to my dev database, I've pasted the same data here so you can toss it into your own (I called mine "recruitR_DB"), create your collections, and add the data.

Basically, you'll need four collections:

- positions
- applicants
- recruiters
- matches

Add the data below to each of those:

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
            "MongoDB"
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
            "MongoDB",
             Programming"
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
    }
]
```