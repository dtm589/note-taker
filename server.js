//Import express.js
const express = require('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

//Import fs to edit files
const fs = require('fs');

//Initialize express.js
const PORT = 3001;
const app = express();

// Middleware for parsing application/json
app.use(express.json());

// Static middleware pointing to the public folder
app.use(express.static('public'));







// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);