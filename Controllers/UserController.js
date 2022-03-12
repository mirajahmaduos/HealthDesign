const userModel = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
var nodemailer = require('nodemailer');

//create user post request
exports.Register =async function(req, res){
    // console.log(req.body);
    var userData = req.body;
    userData.ProfilePhoto = req.file.filename;
    userData.Password = bcrypt.hashSync(req.body.Password, 10);
    // try{
        userModel.create(userData, (err, user)=>{
            if(err)
               return res.status(400).send({msg:"User Registeration Failed", err:err}); 
            //if user is created then create a toke
            var token = jwt.sign(user.Email, process.env.SECRET_KEY);
            res.status(200).send({msg:"User Registered with Token assigned", token:token, user:user});
        })
    // }catch(error){
    //     res.status(400).send({error:error.message, msg:"error in creating user", success:false});
    // }
}

//post request login
exports.Login =async function(req, res){
    const {email, password} = req.body;
    userModel.findOne({Email:email}, function(err, user){
        if(err) return res.status(400).send({msg:"Error in User finding", err:err}); 
        if(!user) return res.status(200).send({msg:"Email Not Exist", user:user}); 
        //if user found on email then check password
        var passwordIsValid = bcrypt.hashSync(password, user.Password);
        if(passwordIsValid){
            var token = jwt.sign({email:user.Email, id:user._id}, process.env.SECRET_KEY);
            res.status(200).send({msg:"Login Successful", token:token, user:user});
        }else{
            res.status(400).send({msg:"Invalid Password"})
        }
    })
}


//get all users --get request
exports.getAllUsers =async function (req, res){
    //get the user on token if user is verified on token then return the users
    userModel.find((err, result)=>{
        if(!err){
            res.status(200).send({Users:result});
        }else{
            res.status(400).send({msg:"Error in Returning Users", err:err});
        }
    })
}

// get specific user  ---get request by id
exports.userProfile =async function(req, res){
    userModel.findById({_id:req.params.id}, (err, result)=>{
        if(!err){
            res.status(200).send({msg:"Successful", user:result})
        }else{
            res.status(400).send({msg:"Failed", error:err});
        }
    })
}

// update user info-- put request 
exports.updateAccount =async function(req, res){
    //get data from body
    var userData = req.body;
    // get image from body if it is provided
    if(req.file){userData.ProfilePhoto = req.file.filename;}
    //encrypt password if provided
    if(req.body.Password){ userData.Password = bcrypt.hashSync(req.body.Password, 10);}
    // userData.Password = bcrypt.hashSync(req.body.Password, 10);
    
     userModel.findByIdAndUpdate({_id:req.params.id}, userData, async function(err, user){
        if(err){
             res.status(200).send({action:false, msg:"Failed to Retreive User", error:err});
        }else{
            res.status(400).send({action:true, msg:"User Updated", user:user});
        }
    })
}
// var sentCode = {};
exports.forgotPassword = async function(req, res){
    
    //1- check user email if exist then send code to email
    //2- get the code and verify it matched then update the password for given user
    userModel.findOne({Email:req.body.Email}, function(err, account){
        if(err) return res.status(400).send({msg:"User/Account Error", error:err});
        if(!account) return res.status(400).send({msg:"User/Account Not Exist", account:account});
        // res.status(200).send({msg:"User Account", account:account});
        
        // var verificationCode = Math.floor(token.length * Math.random());
        /* var verificationCode = '';
        for(let i=0; i< 2; i++){
            verificationCode += Math.floor(token.length * Math.random());
        } */
        var verificationCode =Math.random().toString().substring(2,8);
        //  sentCode = verificationCode;
        const senderAccount = 'mirajahmaduos@gmail.com';
        const senderPasword = '!Dell@11118';
        var emailSubject = 'Your Account Verification Code';
        // res.send({token:token.length, code:verificationCode, random:Math.random()}); return ;
        var transporter = nodemailer.createTransport({
            service:'gmail',
            host: 'smtp.gmail.com',
            auth:{
                 user: senderAccount,
                 pass: senderPasword
            }
        });
        var mailOptions ={
            from: senderAccount,
            to:  account.Email, //'mirajahmaduae@gmail.com',
            subject: emailSubject,
            text: 'Please use this as your Verification Code',
            html: '<h1>'+verificationCode+'</h1>'
        }
        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                res.status(400).send({msg:"Email Sending Error", err:err});
                // console.log(err); res.end();
            }else{
                // var token = jwt.sign({Email:account.Email}, process.env.SECRET_KEY);
                // console.log('Email Sent', info.message); res.end();
                //now the email with verification code is sent then verify the code
                //compare the verification from req.body with the one sent 
                /* if(req.body.verificationCode === verificationCode){
                    //get password, hash password and update it to the user/email

                } */
                // account.VerificationCode = verificationCode;
                //save the verification code to database
                userModel.updateOne({Email:req.body.Email}, {VerificationCode:verificationCode}, function(err, account){
                    if(!err && account){
                        //if everything is ok. here no need to tell user that code being save to db
                    }else{
                        return res.status(400).send({msg:"Problem occured ", err:err, account:account});
                    }
                })
                var token = jwt.sign({Email:account.Email}, process.env.SECRET_KEY);
                res.status(200).send({msg:"email sent with Verification Code",Code:verificationCode,
                token:token, info:info.envelope});
            }
        })
        
    });
}
exports.resetPassword = async function(req, res){
    //get verification code, password and token from body and compare code on token 
    const {verificationCode, password, token} = req.body;
    // res.send(req.body); return;
    //verify jwt and extract email
    jwt.verify(token, process.env.SECRET_KEY, function(err, decode){
        if(err) return res.status(400).send({msg:"token not verified"});
        if(!decode.Email) return res.status(400).send({msg:"No user Exist on provided token"});
        // res.send(user.Email); return;  //extract email from token
        //find user on email
        userModel.findOne({Email:decode.Email}, function(err, user){
            //if verification code matches
            if(user.VerificationCode === verificationCode){
                // user.Password = password;
                userModel.updateOne({Pasword:password}, function(err, result){
                    if(!err && result){
                        res.status(200).send({msg:"Your Password is Updated Successfully"});
                    }
                })        
            }else{
                res.status(400).send({msg:"Verification Code does not match"})
            }
        }); 
        
    });
}
//update / change password
exports.changePassword = async function(req, res){
    console.log(req.body);
}
// delete user info-- delete request 
exports.deleteUser =async function(req, res){
    
}




// {
//     FullName:req.body.FullName,
//     Email: req.body.Email,
//     Password: bcrypt.hashSync(req.body.Password, 10),
//     Location: req.body.Location,
//     BioInfo: req.body.BioInfo,
//     ProfilePhoto: req.file.filename,
//     ContactNo: req.body.ContactNo,
//     Role: req.body.Role,
//     AccountStatus: req.body.AccountStatus
// }