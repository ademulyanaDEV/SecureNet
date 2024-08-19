const express = require('express');
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const socketIo = require('socket.io');
const config = require('./config.json');

// Setup logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: config.logFile })
  ]
});

// Setup Express server
const app = express();
const server = require('http').createServer(app);
const io = socketIo(server);

// Serve dashboard files
app.use(express.static(path.join(__dirname, 'dashboard')));

// Example: Handling network traffic and detecting intrusions
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Simulate detection
  setInterval(() => {
    const threatDetected = Math.random() < 0.1; // 10% chance
    if (threatDetected) {
      const alert = 'Intrusion detected at ' + new Date().toISOString();
      logger.info(alert);
      socket.emit('alert', alert);
    }
  }, 5000);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
server.listen(config.port, () => {
  console.log(`SecureNet server running on port ${config.port}`);
});
