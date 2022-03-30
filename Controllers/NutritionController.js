var nutritionModel = require('../Models/NutritionModel');

exports.postNutrition = async (req, res)=>{
    var nutritionData = req.body;
    // console.log(nutritionData);
    var nutrition = new nutritionModel(nutritionData);
    nutrition.save((err, result)=>{
        if(!err && result != null){
            res.status(200).send({msg:"Nutrition Posted", Nutrition:result});
        }else{
            res.status(400).send({msg:"Error in posting Nutrition", error:err, result:null}); 
        }
    })
}

exports.viewNutrition = async (req, res)=>{
    nutritionModel.find((err, result)=>{
        if(err) return res.status(400).send({msg:"Error in getting Nutrition", error:err});
        if(!result) return res.status(400).send({msg:"Nutritions Not Found", result:null});
        res.status(200).send({msg:"Nutritions Returned", Nutritions:result});
    })
}

