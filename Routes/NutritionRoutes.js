var nutritionController = require('../Controllers/NutritionController');
var express = require('express');
var nutritionRouter = express.Router();


nutritionRouter.post('/post', nutritionController.postNutrition);

nutritionRouter.get('/view', nutritionController.viewNutrition);

module.exports = nutritionRouter;

