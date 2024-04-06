// Import necessary modules
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define user schema using Mongoose
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, immutable: true},
  password: { type: String, required: true },
});

// Plugin passport-local-mongoose to user schema for simplified authentication
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// Export the user schema as a model named 'User' for use in other parts of the application
module.exports = mongoose.model('User', userSchema);
