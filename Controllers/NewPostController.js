var fitnessModel = require('../Models/FitnessModel');
var excerciseModel = require('../Models/ExcerciseModel');

//on page 15.1 the design screenshot show fitness and excercise posting at the same time
//this create post with fitness && excercise
exports.createNewPost = async(req, res)=>{
    const {fitness_title, fitness_description, fitness_pricing, excercise_title, excercise_duration} = req.body;
    const fitnessImage = req.files.fitness_banner_image[0]; //fitness image
    const excerciseImage = req.files.excercise_file[0];  //excercise video file 
    // console.log(image); return;
    fitnessModel.create({Fitness_title: fitness_title, Fitness_description:fitness_description,
         Fitness_pricing :fitness_pricing, Fitness_banner_image:fitnessImage.filename}, function(err, result){
        //if(err) console.log(err); //return res.status(400).send({msg:"Error in adding fitness", error:err});
        //if(!result) return res.status(400).send({msg:"Fitness not added", Fitness:result});
        if(!err && result != null){
            excerciseModel.create({Excercise_title: excercise_title, Excercise_duration:excercise_duration,
                Excercise_file:excerciseImage.filename}, function(err, excercise){
               //if(err) return res.status(400).send({msg:"Error in adding excercise", error:err});
               //if(!result) return res.status(400).send({msg:"Excercise not added", Excercise:[]});
               if(!err && result != null) {
                    res.status(200).send({msg:"Fitness and Excercise  Added", Fitness:result, Excercise:excercise});
               }else{
                   res.status(400).send({msg:"Error in posting excercise", error:err});
               }
           })
        }else{
            res.status(400).send({msg:"Error in posting Fitness", error:err});
        }
        // res.status(200).send({msg:"Fitness Added", Fitness:result});
    })
    
    
}