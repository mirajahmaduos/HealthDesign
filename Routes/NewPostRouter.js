var newPostController = require('../Controllers/NewPostController');
var express = require('express');
var newPostRouter = express.Router();
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        // cb(null, '/Uploads/NewPosts');
        if(file.fieldname === 'fitness_banner_image'){
            cb(null, './Uploads/Fitness');
        }
        if(file.fieldname === 'excercise_file'){
            cb(null, './Uploads/Excercise');
        }
    },
    filename: function(req, file, cb){
        var date = new Date();
        date = date.getUTCDate()+"-"+date.getUTCMonth()+"-"+date.getUTCFullYear();
        // cb(null, file.fieldname+"-"+ date+path.extname(file.originalname));
        if(file.fieldname === 'fitness_banner_image'){
            cb(null, file.fieldname+date+path.extname(file.originalname));
        }
        if(file.fieldname === 'excercise_file'){
            cb(null, file.fieldname+"-"+date+path.extname(file.originalname));
        }
    }
})
var fileFilter = (req, file, cb)=>{
    if(file.fieldname === 'fitness_banner_image'){
        if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else{ 
            cb(Error("Invalid file type"), false)
        }
    }
    if(file.fieldname === 'excercise_file'){
        if(file.mimetype === 'video/mp4' || file.mimetype === 'video/avi'){
            cb(null, true);
        }else{ 
            cb(Error("Unsupported video type"), false)
        }
    }
}
var upload = multer({storage:storage, fileFilter:fileFilter});
var uploadMultiples = upload.fields([{name:'fitness_banner_image', maxCount:1},{name:'excercise_file', maxCount:1}])

newPostRouter.post('/create', uploadMultiples, newPostController.createNewPost);

module.exports = newPostRouter;