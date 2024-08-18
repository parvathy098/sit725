const Recipe = require('../models/Recipe');

const submitRecipe = (req, res) => {
  const formData = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  };

  Recipe.insertRecipe(formData)
    .then(result => {
      console.log('Recipe saved to database');
      res.redirect('/success');
    })
    .catch(error => console.error(error));
};

module.exports = { submitRecipe };
