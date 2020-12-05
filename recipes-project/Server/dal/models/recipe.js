const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let recipe = new Schema({
    name: String,
    source: String,
    preptime:Number,
    waittime:Number,
    servings:Number,
    comments:String,
    calories:Number,
    fat:Number,
    satfat:Number,
    carbs:Number,
    fiber:Number,
    sugar:Number,   
    protein:Number,
    instructions:String,
    ingredients:Array,
    tags:Array
  },{collation:'recipes'});

  const model = mongoose.model('recipes', recipe);
  module.exports = model;