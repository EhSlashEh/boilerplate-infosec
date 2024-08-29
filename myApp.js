const express = require('express');
const helmet = require('helmet');
const app = express();

// Use Helmet to secure the app
app.use(helmet());

// Hide the X-Powered-By header
app.use(helmet.hidePoweredBy());

// Prevent the app from being embedded in an iframe
app.use(helmet.frameguard({ action: 'deny' }));

// Import and use the API routes
const api = require('./server.js');
app.use('/_api', api);

// Serve static files
app.use(express.static('public'));

// Disable strict-transport-security header
app.disable('strict-transport-security');

// Define the route for the root
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Set the port and start the server
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

module.exports = app;
