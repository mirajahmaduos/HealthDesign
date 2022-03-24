const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const certificate = new Schema({
    Title:{type:String, required:true},
    Description:{type:String, required:true},
    Image:{type:String, required:true}
}, {versionKey:false});

module.exports = mongoose.model("CertificateModel", certificate, collection="Certificates");