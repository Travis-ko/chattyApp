// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    // if (client.readyState === SocketServer.OPEN) {
    client.send(data);
    console.log('data sent to client from server');
    // }
  });
};

wss.on('connection', function connection(client) {
  console.log('Client connected');
  const clientSize = {};
  clientSize.count = "clientNumber" + wss.clients.size + " Users Online";
  wss.broadcast(JSON.stringify(clientSize));
  client.on('message', function incoming(message) {
    console.log('received: %s', message);
     wss.broadcast(message);
  });
  client.on('close', () => console.log('Client disconnected'));
});