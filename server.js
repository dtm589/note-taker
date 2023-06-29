//Import express.js
const express = require('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

//Import fs to edit files
const fs = require('fs');

const util = require('util');
// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

//Initialize express.js
const PORT = 3001;
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
})

//HTML routes for GET *
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);