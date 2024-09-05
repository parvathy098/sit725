const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const recipeController = require('./controllers/recipeController');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3056;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the importance of health page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'importance.html'));
});

// Serve the recipe page
app.get('/recipe', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Form submission
app.post('/submit-form', recipeController.submitRecipe);

// Serve the success page after form submission
app.get('/success', (req, res) => {
  res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Success</title></head><body><h1>Data Submitted Successfully</h1><a href="/">Back to Importance of Health</a></body></html>');
});

// Socket.io implementation
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  setInterval(() => {
    socket.emit('number', parseInt(Math.random() * 10));
  }, 1000);
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
