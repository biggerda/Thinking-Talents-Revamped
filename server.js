// Get dependencies
const express = require('express');
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const http = require('http');

const app = express();
app.use(cors())

const teamMock = JSON.parse(fs.readFileSync(`${__dirname}/team.json`, 'utf8'));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/updated-thinking-talents')));

// Routes
app.get('/team', (req, res) => {
  console.log('Mocked Team: ', teamMock);
  res.send(teamMock);
});

// Catch all other routes and return the index file
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
