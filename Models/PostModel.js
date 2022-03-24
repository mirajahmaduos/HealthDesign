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
    Fitness_id:{type: Schema.Types.ObjectId, ref: "Fitness", required:true},
    Nutrition_id:{type: Schema.Types.ObjectId, ref: "Nutrition", required:true},
    Excercise_id:{type: Schema.Types.ObjectId, ref: "Excercise", required:true},
    Created_at:{
        type: Date,
        default: Date.now
    }
}, {versionKey:false});

module.exports = mongoose.model("PostModel", post, collection="Posts");