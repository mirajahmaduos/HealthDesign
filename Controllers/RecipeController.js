var RecipeModel = require('../Models/RecipeModel');

exports.addRecipe = async function(req, res){
    const recipe = new RecipeModel({
        Name: req.body.Name,
        Method: req.body.Method,
        Ingredient: req.body.Ingredient,
        Duration: req.body.Duration,
        Image: req.file.filename
    });
    await recipe.save(function(err, recipe){
        if(!err && recipe){
            res.status(200).send({msg:"Recipe Added", Recipe:recipe});
        }else{
            res.status(400).send({msg:"Problem in Recipe", Recipe:recipe, error:err});
            // console.log(err);
        }
    })
}

exports.recipeDetails = async function(req, res){
    
}