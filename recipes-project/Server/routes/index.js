const express = require('express')
const router = express()
const recipeRoute = require('./recipes')

router.use("/recipe",recipeRoute)

module.exports = router;