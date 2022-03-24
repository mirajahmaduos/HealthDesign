const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipe = Schema({
    Name:{
        type:String,
        required:true
    },
    Duration:{
        type:String,
        required:true
    },
    Ingredient:{
        type:String,
        required:true
    },
    Method:{type:String,
        required:true},
    Image:{type:String, required:true}
}, {versionKey:false});

module.exports = mongoose.model("RecipeModel", recipe, collection="Recipes");