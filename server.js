// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');

// Mocked Data
// const fs = require('fs');
// const teamMock = JSON.parse(fs.readFileSync(`${__dirname}/team.json`, 'utf8'));

// Connect Database
const mongoose = require('mongoose');
const db = mongoose.connect(
  'mongodb://localhost/thinking-talents',
  {useNewUrlParser: true, useUnifiedTopology: true})
const Teams = require('./src/models/teamModel')


// Start Application
const app = express();
const teamRouter = express.Router();

// Enable CORS
const cors = require('cors');
app.use(cors())

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/updated-thinking-talents')));

// Router Setup
teamRouter.route('/teams')
  .get((req, res) => {
    Teams.findById('6001ff268f860db83b6c6f7b',(err, sampleTeam) => {
      if (err) {
        console.log(`ERR - GET /teams - findById ${err}`);
        return res.send(err);
      }

      return res.json(sampleTeam);
    })
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
