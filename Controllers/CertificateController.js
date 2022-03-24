const certificateModel = require('../Models/CertificateModel');

exports.addCertificate = async function(req, res){
    const {title, description} = req.body;
    const image = req.file.filename;
    certificateModel.create({Title: title, Description:description, Image:image}, function(err, result){
        if(err) return res.status(400).send({msg:"Error in adding certificate", error:err});
        if(!result) return res.status(400).send({msg:"Certificate not added", certificate:[]});
        res.status(200).send({msg:"Certificate Added", certificate:result});
    })
}
exports.showCertificates = async function(req, res){
    certificateModel.find((err, result)=>{
        if(!err && result != null){
            res.status(200).send({msg:"Certificates Returned", Certificates:result});
        }else{
            res.status(400).send({msg:"Problem in fetching data", error:err, certificates:result});
        }
    })
}