const mongoose = require('mongoose');

const users = mongoose.Schema({
    FullName:{
        type:String, required:[true, 'User name Required'], 
    },
    Email:{type:String, required:[true, 'Email is Required'], trim:true, lowercase:true, unique:true},
    Password:{type:String, required:[true, 'Password is Required']},
    Location:{type:String},
    BioInfo:{type:String},
    ProfilePhoto:{type:String},
    ContactNo:{type:String},
    Role:{type:String, enum:['ADMIN', 'USER'], default:'USER'},
    AccountStatus:{type:String, enum:['Pending', 'Approved', 'Active', 'Blocked'], default:'Approved'},
    VerificationCode: {type:String}
},{versionKey:false});

module.exports = mongoose.model('UsersModel', users, collection="Users");

