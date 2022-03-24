const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nutrition = Schema({
    Nutrition_title:{
        type:String,
        required:true
    },
    Nutrition_category:{
        type:String,
        required:true
    },
    Instruction:{
        type:String,
        required:true
    },
    Duration:{type:String,
        required:true},
    Method: {type:String, required:true}
}, {versionKey:false});

module.exports = mongoose.model("NutritionModel", nutrition, collection="Nutritions");