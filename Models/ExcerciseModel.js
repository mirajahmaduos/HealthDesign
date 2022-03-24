var mongoose = require('mongoose');

var excercise = mongoose.Schema({
    Excercise_title:{type:String, required:true}, //leg, shoulder 
    Excercise_type:{type:String, required:true}, //fitness, nutrition
    Exceercise_description: {type:String, required:true},
    Excercise_duration:{type:String, required:true}
}, {versionKey:false})

module.exports = mongoose.model("ExcerciseModel", excercise, collection="Excercise");

