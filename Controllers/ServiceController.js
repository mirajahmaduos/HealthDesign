var serviceModel = require('../Models/ServiceModel');

exports.addService = async (req, res)=>{
    const serviceData = req.body;
    const service = new serviceModel({
        Service_title: serviceData.Title,
        Service_category: serviceData.Category,
        Service_description: serviceData.Description,
        Service_duration: serviceData.Duration,
        Service_price: serviceData.Price,
        Service_file: req.file.filename
    });
    await service.save((err, result)=>{
        if(err) return res.status(400).send({error:err});
        if(!result) return res.status(400).send({msg:"Service Not Added", result:null});
        res.status(200).send({msg:"Service Added", Service:result});
    })
}

exports.serviceDetials = async (req, res)=>{
    serviceModel.find((err, services)=>{
        if(!err && services != null){
            res.status(200).send({Services:services});
        }else{
            res.status(400).send({error:err, result:services});
        }
    })
}