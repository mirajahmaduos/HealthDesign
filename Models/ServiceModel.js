const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    Service_title:{
        type:String,
        required:true
    },
    Service_description:{
        type:String
    },
    Service_price:{
        type:String,
        required:true
    },
    Service_category:{
        type:String,
        enum: ['Select', 'Fitness', 'Nutrition', 'Excercise'],
        default: 'select'
    },
    Service_duration:{
        type:String,
        required:true
    },
    Service_file:{type:String, required:true}
}, {versionKey:false});

module.exports = mongoose.model("ServiceModel", serviceSchema, collection="Services" );