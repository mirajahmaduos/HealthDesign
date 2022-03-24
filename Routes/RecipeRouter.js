var express = require('express');
var RecipeController = require('../Controllers/RecipeController');
var RecipeRouter = express.Router();
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './Uploads/Recipe')
    },
    filename: function(req, file, cb){
        var date =new Date();
        cb(null, file.fieldname+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+path.extname(file.originalname));
    }
})
var upload = multer({storage:storage});
RecipeRouter.post('/add', upload.single('Image'), RecipeController.addRecipe);
RecipeRouter.get('/details', RecipeController.recipeDetails);


module.exports = RecipeRouter;