var mongoose = require('mongoose');

var excerciseSchema = mongoose.Schema({
    Excercise_title:{type:String, required:true}, //leg, shoulder 
    Excercise_duration:{type:String, required:true},
    Excercise_file:{type:String, required:true}
}, {versionKey:false})

module.exports = mongoose.model("ExcerciseModel", excerciseSchema, collection="Excercise");

