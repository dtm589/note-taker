//Import express.js
const express = require('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

//import db.json
let notesData = require('./db/db.json');

//Import fs to edit files
const fs = require('fs');

//Import uuid
const { v4: uuidv4 } = require('uuid');

const util = require('util');
// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

//Function to write data to the JSON file given a destination and some content
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

//Function to read data from a given a file and append some content
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

//Initialize express.js
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing application/json
app.use(express.json());

// Static middleware pointing to the public folder
app.use(express.static('public'));

//HTML route for GET /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//API route for GET /api/notes
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//API route for POST /api/notes
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note saved successfully!`);
    } else {
        res.errored('Error');
    }
});

//HTML routes for GET *
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);