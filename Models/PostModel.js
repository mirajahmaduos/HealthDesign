const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = Schema({
    Post_title:{
        type:String,
        required:true
    },
    Post_description:{
        type:String,
        required:true
    },
    Fitness_id:{type: Schema.Types.ObjectId, ref: "FitnessModel"},
    Nutrition_id:{type: Schema.Types.ObjectId, ref: "NutritionModel"},
    Excercise_id:{type: Schema.Types.ObjectId, ref: "ExcerciseModel"},
    Created_at:{
        type: Date,
        default: Date.now
    }
}, {versionKey:false});

module.exports = mongoose.model("PostModel", post, collection="Posts");