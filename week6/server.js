const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3055;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection URL and Database name
const uri = "mongodb+srv://s224231602:BFZu7mjHgJn9NjDJ@cluster0.abrhfrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'healthyRecipesDB';

let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    db = client.db(dbName);
  })
  .catch(error => console.error(error));

// Serve your form from a static file in the public folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  const formData = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  };

  db.collection('recipes').insertOne(formData)
    .then(result => {
      console.log('Recipe saved to database');
      res.redirect('/');
    })
    .catch(error => console.error(error));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
