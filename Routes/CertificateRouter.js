const express = require('express');
const CertificateController = require('../Controllers/CertificateController');
const CertificateRouter = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './Uploads/');
    },
    filename: function(req, file, cb){
        var today = new Date();
        today = today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear();
        cb(null, file.originalname+"-"+ today);
    }
})
var upload = multer({storage:storage});
//image is the body field name
CertificateRouter.post('/add', upload.single("image"), CertificateController.addCertificate);
CertificateRouter.get('/show', CertificateController.showCertificates);

module.exports = CertificateRouter;