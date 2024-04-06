// Import required modules
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const User = require("./models/user");

// Import routes
const indexRouter = require("./routes/index");
const recipesRouter = require("./routes/recipes");

require("dotenv").config(); // Load environment variables
// console.log(process.env)

// Connect to MongoDB database
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() =>
    console.log("MongoDB connected to", process.env.CONNECTION_STRING)
  )
  .catch((error) => console.log(error));

// Initialize Express application
const app = express();

// Set up view engine and static file directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials", function (err) {});

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Session and passport middleware setup
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware to make 'authenticated' available in templates
app.use(function (req, res, next) {
  // Make `authenticated` available in templates
  res.locals.authenticated = req.user !== undefined && !req.user.anonymous;
  next();
});

// Passport local strategy setup
passport.use(
  new LocalStrategy({ usernameField: "email" }, User.authenticate())
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes setup
app.use("/", indexRouter);
app.use("/recipes", recipesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error"); 
});

module.exports = app;
