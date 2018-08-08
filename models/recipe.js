
const mongoose = require("mongoose");
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new RecipeSchema object
const recipeSchema = new Schema({
  // `title` is required and of type String
  recipeTitle: {
    type: String,
    required: true,
   unique: true
  },
  // `link` is required and of type String
  recipeLink: {
    type: String,
    required: true
  },
  // `imgSrc` is of type String
  recipeImage: {
    type: String,
    required: false,
    default: "" 
  },
  healthlabels: {
  	type: String,
  	required: false
  },
 dietlabels: {
  	type: String,
  	required: false
  },
calories: {
  	type: Number,
  	required: false
  },
  // `datePosted` is not required and of type Date
  date: { 
  	type: Date,
  	required: false,
  	default: Date.now  
  }

});

// This creates our model from the above schema, using mongoose's model method
const Recipes = mongoose.model("Recipes", recipeSchema);
// Export the Recipe model
module.exports = Recipes;
