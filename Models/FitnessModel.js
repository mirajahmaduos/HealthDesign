const mongoose = require('mongoose');

const fitness = mongoose.Schema({
    Fitness_title:{
        type:String,
        required:true
    },
    Fitness_description:{
        type:String,
        required:true
    },
    Fitness_pricing:{
        type:String, enum :['Free', 'Premium'], default: 'Free'
    },
    Fitness_banner_image:{type:String, required:true}
}, {versionKey:false});

module.exports = mongoose.model("FitnessModel", fitness, collection="Fitness");