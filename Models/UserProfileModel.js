const mongoose = require('mongoose');

const user = mongoose.Schema({
    FullName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Location:{type:String},
    Bio_info:{type:Stirng}
});

module.exports = mongoose.model("UserProfile", user);