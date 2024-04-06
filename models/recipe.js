// Import Mongoose
const mongoose = require("mongoose");

// Define recipe schema using Mongoose
// const recipeSchema = new mongoose.Schema({
const recipeSchema = mongoose.Schema({
  title: { type: String, required: true }, // Define title field with required property
  ingredients: { type: String, required: true }, // Define ingredients field with required property
  instructions: { type: String, required: true }, // Define instructions field with required property
  tags: { type: String }, // Define tags field as optional
  ratings: [{ user: String, rating: Number }], // Define ratings field as an array of objects with user and rating properties
});

// Export the recipe schema as a model named 'Recipe' for use in other parts of the application
module.exports = mongoose.model("Recipe", recipeSchema);
