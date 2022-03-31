var reactionModel = require('../Models/ReactionModel');
const mongoose = require('mongoose');

//add reaction has problem 
exports.addReaction = async (req, res)=>{
    const {user, post, reaction} = req.body;
    var reactionData = {
        User_id: user,
        Post_id:post,
        Reaction_value:reaction
    }
    // try{ //console.log(user); return;
    //restricting duplicate documents
        await reactionModel.find({Post_id: req.body.post, User_id:req.body.user}, async (err, result)=>{
                // console.log(result); return;  //when not exist return [] and its length is 0
                // console.log(result.length); return;
                // console.log(Array.isArray(result)); return;
                //stop duplicate entries. if data exist for the given user & post
                // if(!result.length){console.log('reaction not exist'); } return;
                if(err || result.length > 0){
                    res.status(200).send({msg:"Reaction on this post already exist.",error:err, Reaction:result});
                }else{
                   await reactionModel.create(reactionData, (err, result)=>{
                        if(!err && result != null){
                            res.status(200).send({msg:"Reaction Added", reaction:result});
                        }else{
                            res.status(400).send({msg:"Couldn't added", error:err, reaction:[]})
                        }
                    })
                }
        }).clone()
    // }catch(err){
    //     res.status(200).send(err);
    // }
}
exports.viewReactionByUser = async (req, res)=>{
    // console.log(req.query.userId);
    reactionModel.find({User_id:req.query.userId},(err, result)=>{
        if(err) return res.status(400).send({msg:"Error in returning user reaction", error:err});
        if(result == null) return res.status(400).send({msg:"User Reactions not exist", result:[]});
        res.status(200).send({msg:"User Reactions", "User Reactions":result}); 
    })
}
exports.viewReactionByPost = async (req, res)=>{
    reactionModel.find({Post_id:req.query.postId}, (err, result)=>{
        if(!err && result != null){
            res.status(200).send({msg:"Post Reaction", "Post Reaction":result});
        }else{
            res.status(400).send({msg:"Error in Returning Reaction on Post", error:err, "Post Reaction":[]})
        }
    })
}
exports.deleteORrollbackReaction = async(req, res)=>{
    const {userId, postId} = req.query;
    // console.log(userId, "and", postId);
    reactionModel.findOneAndDelete({User_id:userId, Post_id:postId}, (err, result)=>{
        // console.log(result);
        if(!err && result){
            res.status(200).send({msg:"Reaction Rollback/deleted", Reaction:result});
        }else{
            res.status(400).send({msg:"Problem in deleting/Rollback Reaction", Reaction:[], error:err});
        }
    })
}
//total likes, sad, love on post. count no of likes/sad/angry on post
exports.reactionStatsByPost = async(req, res)=>{
    // console.log(req.query.postId);
    /* reactionModel.countDocuments({Reaction_value:'Like'}, (err, count)=>{
        res.send(`there are ${count} like`);
    }) */
    const Post_id = mongoose.Types.ObjectId(req.query.postId);
    reactionModel.aggregate([
        // {$group: {
        //     Post_id:{
        //         Post_id: "$Reactions.Post_id"
        //     }
        // }},
        { "$match" : { "Post_id" : Post_id} }, //match aggregation used to filter out what we need 
        { "$facet":{  //facet aggregation used for multiple stages pipline/multiple level
            
            "Total": [
                {"$match": {"Reaction_value": {"$exists": true}}},
                {"$count": "Total"}, //count aggregation used for single stage count
            ],
            "Likes":[
                {"$match": {"Reaction_value": {"$exists":true, "$in":["Like"]}}},
                {"$count": "Likes"}
            ],
            "Sad":[
                {"$match":{"Reaction_value": {"$exists": true, "$in": ["Sad"]}}},
                {"$count": "Sad"}
            ],
            "Angry":[
                {"$match": {"Reaction_value": {"$exists":true, "$in":["Angry"]}}},
                {"$count": "Angry"}
            ],
            "Love":[
                {"$match": {"Reaction_value": {"$exists": true, "$in": ["Love"]}}},
                {"$count": "Love"}
            ]
        }},
        {"$project": { //passes the doc with only specified field to next stage.
            "Total Reaction":{"$arrayElemAt":["$Total.Total", 0]},
            "Likes":{"$arrayElemAt": ["$Likes.Likes", 0]},
            "Sad": {"$arrayElemAt": ["$Sad.Sad", 0]},
            "Angry": {"$arrayElemAt": ["$Angry.Angry", 0]},
            "Love": {"$arrayElemAt": ["$Love.Love", 0]}
        }}
    ], (err, result)=>{
        // console.log(result);
        if(err) return res.status(200).send({msg:"Error in Reaction stats by Post", error:err});
        res.status(200).send({stats:result});
    })
    
}
//Stats of reactions by user
exports.reactionStatsByUser = async(req, res)=>{
    const User = mongoose.Types.ObjectId(req.query.userId);
    // console.log(User); return;
    reactionModel.aggregate([
        {$match :{User_id: User}},
        { "$facet":{  //facet aggregation used for multiple stages pipline/multiple level
            
            "Total": [
                {"$match": {"Reaction_value": {"$exists": true}}},
                {"$count": "Total"}, //count aggregation used for single stage count
            ],
            "Likes":[
                {"$match": {"Reaction_value": {"$exists":true, "$in":["Like"]}}},
                {"$count": "Likes"}
            ],
            "Sad":[
                {"$match":{"Reaction_value": {"$exists": true, "$in": ["Sad"]}}},
                {"$count": "Sad"}
            ],
            "Angry":[
                {"$match": {"Reaction_value": {"$exists":true, "$in":["Angry"]}}},
                {"$count": "Angry"}
            ],
            "Love":[
                {"$match": {"Reaction_value": {"$exists": true, "$in": ["Love"]}}},
                {"$count": "Love"}
            ]
        }},
        {"$project": { //passes the doc with only specified field to next stage.
            "Total Reaction":{"$arrayElemAt":["$Total.Total", 0]},
            "Likes":{"$arrayElemAt": ["$Likes.Likes", 0]},
            "Sad": {"$arrayElemAt": ["$Sad.Sad", 0]},
            "Angry": {"$arrayElemAt": ["$Angry.Angry", 0]},
            "Love": {"$arrayElemAt": ["$Love.Love", 0]}
        }}
    ], (err, result)=>{
        if(err) return res.status(400).send({msg:"Error in Reaction Stats By User", error:err});
        if(result == null) return res.status(400).send({msg:"Stats Returned Failed", Stats:null});
        res.status(200).send({msg:"Reaction Stats By User", Stats:result});
        // if(err) console.log(err); console.log(result);
    })
}