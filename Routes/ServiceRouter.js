var ServiceController = require('../Controllers/ServiceController');
var express = require('express');
var ServiceRouter = express.Router();
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './Uploads/Service');
    },
    filename: function(req, file, cb){
        var date = new Date();
        date = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
        cb(null, file.fieldname+date+path.extname(file.originalname));
    }
})
var upload = multer({storage:storage});

ServiceRouter.post('/add', upload.single('File'), ServiceController.addService);

ServiceRouter.get('/details', ServiceController.serviceDetials);

module.exports = ServiceRouter;