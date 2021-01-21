// Get dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();
const cors = require('cors');
const http = require('http');
const path = require('path');
const port = process.env.PORT || '8080';

// Models and Routers
const Team = require('./src/models/teamModel');
const teamRouter = require('./src/routes/teamRouter')(Team);

// Application Setup
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', teamRouter);
app.set('port', port);

// Connect Database
const uri = "mongodb+srv://dbigz:VODPxPWtDyOuH9oK@maincluster.6gn9e.mongodb.net/thinking-talents?retryWrites=true&w=majority";
const db = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(abc => {
    const server = http.createServer(app);
    server.listen(port, () => console.log(`Application is running at http://127.0.0.1:${port}`));
  })
  .catch(err => {
    if (err) throw err;
  })


// Mocked Data
// const fs = require('fs');
// const teamMock = JSON.parse(fs.readFileSync(`${__dirname}/team.json`, 'utf8'));


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/updated-thinking-talents')));

// Catch all other routes and return the index file
// TODO: Create 'page not found' for this scenario
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/updated-thinking-talents/index.html'));
});
