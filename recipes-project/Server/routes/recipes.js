const express = require('express')
const router = express.Router()
const recipeModel = require('../dal/models/recipe')
router.get('/',async (req,res)=>{
    try{
        const temp = await recipeModel.find({calories:{$ne:0}});
        res.send(temp)
    }catch(err)
    {
        res.send(err);
    }
})

module.exports = router;