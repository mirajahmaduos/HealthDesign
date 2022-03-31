var friendModel = require('../Models/FriendsListModel');
var userModel = require('../Models/User')
var mongoose = require('mongoose');

//follow a person // sent request / add friend / connect
exports.addFriend = async (req, res)=>{
    // console.log(req.query, req.body);
    var {Sender, Reciever} = req.query; 
    // console.log(Sender);
    var requestValue = req.body.RequestValue;
    //dup doc can be prevent from making invisible the follow/unfollow link/button in UI once request is sent
    friendModel.create({AddRequest:Sender, RecieveRequest:Reciever, RequestValue:requestValue}, function(err, result){
        if(!err && result){
            res.status(200).send({msg:"Request Sent. Following..", Following:result});
        }else{
            res.status(400).send({msg:"error in sending friend request", error:err, Following:result});
        }
    })
}
//unfollow a person //unfriend /block as well
exports.unFriend = async (req, res)=>{
    // console.log(req.query, req.body);
    await friendModel.findOneAndUpdate({AddRequest:req.query.Sender, RecieveRequest:req.query.Receiver},
         {RequestValue:req.body.RequestValue},{new:true}, async(err, result)=>{
            if(err) return res.status(400).send({msg:"Error in Updating Request", Error:err});
            res.status(200).send({msg:`Request Updated by making ${req.body.RequestValue}`, friend:result});
         }).clone();
}
//block a person
// exports.blockUser = async (req, res)=>{

// }
//user stats followers, following
exports.userStats = async (req, res)=>{
    // console.log(req.query.userId);
    const userID = mongoose.Types.ObjectId(req.query.userId);
    const user="";
    /* userModel.find({_id:userID}, ).select('FullName').exec((err, result)=>{
        // if(!err)
        console.log(result);
        // console.log(result.FullName);
    }) */
    friendModel.aggregate([
        //filter the AddRequest field with user/provided id
        //AddRequest is the one who follow/block/unfollow others 
        //ReceiveRequest is the one who is followed by others ie followers
        {"$match": {"AddRequest": userID}}, //filter out user who follow/block/unfollow others
        // {"$match": {"RecieveRequest": userID}},
        {"$facet": {  //multiple stages pipeline i.e
            "TotalPersons": [
                {"$match": {"RequestValue": {"$exists":true}}},
                {"$count": "TotalPersons"}
            ],
            "Followers":[
                {"$match": {"RecieveRequest": userID}},
                {"$count": "Followers"}
            ],
            "Following":[
                {"$match": {"RequestValue": {"$exists": true, "$in": ["Follow"]}}},
                {"$count": "Following"}
            ],
            "Unfollow":[
                {"$match": {"RequestValue": {"$exists": true, "$in": ["Unfollow"]}}},
                {"$count": "Unfollow"}
            ],
            "Block":[
                {"$match": {"RequestValue": {"$exists": true, "$in": ["Block"]}}},
                {"$count": "Block"}
            ]
        }},
        {"$project":{ //passes the doc to next stage/print/result
            //$arrayElemAt return the element at specified array index 
            "Total Persons": {"$arrayElemAt": ["$TotalPersons.TotalPersons", 0]}, 
            "Following": {"$arrayElemAt": ["$Following.Following", 0]},
            "Unfollow": {"$arrayElemAt": ["$Unfollow.Unfollow", 0]},
            "Block": {"$arrayElemAt": ["$Block.Block", 0]},
            "Followers": {"$arrayElemAt": ["$Followers.Followers", 0]}
        }}
    ], (err, result)=>{
        // console.log(result); return;
        if(err) return res.status(200).send({msg:"Error in Reaction stats by Post", error:err});
        res.status(200).send({msg:"User Stats", stats:result});
    })
}
