const express = require('express');
const UserController = require('../Controllers/UserController')
const multer = require('multer');
const verifyToken = require('../Security/userValidation');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, './uploads/')
    },
    filename: function(req, file, cb){
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   var ext = file.originalname.split('.');
      // cb(null, file.fieldname + '-' + file.originalname+'.'+ext[1])
      cb(null, file.originalname)
    }
  }); 
  const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};
const upload = multer({storage:storage, limits:{
    fileSize: 1024 * 1024 *8
}, fileFilter : fileFilter});
const UserRouter = express.Router();
//register /signup / create user
UserRouter.post('/register', upload.single("ProfilePhoto"), UserController.Register);
//login / signin
UserRouter.post('/login', UserController.Login);
//get all users after authentication
UserRouter.get('/getallusers', verifyToken, UserController.getAllUsers);
//get specific user
UserRouter.get('/userprofile/:id', UserController.userProfile);
//update user
UserRouter.put('/updateaccount/:id', upload.single("ProfilePhoto"), UserController.updateAccount);
//forgot password
UserRouter.post('/forgotpassword', UserController.forgotPassword);
//reset password after verification code is sent on forgot password
UserRouter.post('/resetpassword', UserController.resetPassword);
//update / change password 
UserRouter.post('/changepassword', UserController.changePassword);
//delete user
UserRouter.delete('/delete', UserController.deleteUser);
module.exports = UserRouter;
