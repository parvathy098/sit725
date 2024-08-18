const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://s224231602:BFZu7mjHgJn9NjDJ@cluster0.abrhfrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'healthyRecipesDB';
let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    db = client.db(dbName);
  })
  .catch(error => console.error(error));

const insertRecipe = (recipeData) => {
  return db.collection('recipes').insertOne(recipeData);
};

module.exports = { insertRecipe };
