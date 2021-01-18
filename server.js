// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
let database;

// Mocked Data
// const fs = require('fs');
// const teamMock = JSON.parse(fs.readFileSync(`${__dirname}/team.json`, 'utf8'));

// Connect Database
// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbigz:VODPxPWtDyOuH9oK@maincluster.6gn9e.mongodb.net/thinking-talents?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
client.connect((err, client) => {
  if (err) throw err;

  database = client.db('thinking-talents').collection('teams');

  /**
   * Get port from environment and store in Express.
   */
  const port = process.env.PORT || '8080';
  app.set('port', port);

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, () => console.log(`Application is running at http://127.0.0.1:${port}`));
});


// const mongoose = require('mongoose');
// const uri_string = process.env.MONGODB_URI || 'mongodb://localhost/thinking-talents';
// const db = mongoose.connect(
//   uri_string,
//   {useNewUrlParser: true, useUnifiedTopology: true})
const Teams = require('./src/models/teamModel')


// Start Application
const app = express();
const teamRouter = express.Router();

// Enable CORS
const cors = require('cors');
const {ObjectId} = require("bson");
app.use(cors())

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/updated-thinking-talents')));

// Router Setup
teamRouter.route('/sample-team')
  .get((req, res) => {
    database.find("60038ec44d8074c7415bd82c")
      .toArray()
      .then(results => {
        console.log(results);
        res.status(200).send(results[0]);
      });
  });

app.use('/api', teamRouter);

// Routes
// app.get('/team', (req, res) => {
//   console.log('Mocked Team: ', teamMock);
//   res.send(teamMock);
// });

// Catch all other routes and return the index file
// TODO: Create 'page not found' for this scenario
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/updated-thinking-talents/index.html'));
});
