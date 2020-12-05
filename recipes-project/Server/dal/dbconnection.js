
var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://admin:admin123@cluster0.apba8.mongodb.net/recipesApp?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once("open", function() {
    console.log("MongoDB database connection established successfully");
  })
  
module.exports = db;