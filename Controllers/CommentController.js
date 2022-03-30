const { response } = require('express');
var commentModel = require('../Models/CommentModel');

exports.postComment = async (req, res)=>{
    const {user, post, comment} = req.body; //console.log(comment); return;
    //filter comments for proper jargon. abusive comments are not allowed]
    let isAllowed = true;
    switch(comment.toLowerCase()) {
        case "fuck": case "koni": case "kwana wrkawa": case "bagai":
            isAllowed = false;
            break;
        case "ass":
            isAllowed = false;
            break;
        case "bitch":
            isAllowed = false;
            break;
        case "kharkwas": case "behnchood": case "motherchood": case"da spee zway":
            isAllowed = false;
            break;
        default:
            isAllowed = true;
            break;
    }
    if(isAllowed){ //console.log(isAllowed); 
        commentModel.create({User_id:user, Post_id:post, Comment_value:comment}, (err, result)=>{
            if(!err && result){
                res.status(200).send({msg:"Comment Added", Comment:result});
            }else{
                res.status(400).send({msg:"Error in adding Comments", error:err, comment:[]})
            }
        })
    }else{
        res.status(400).send({msg:"Abusive/Improper comments are not Allowed", NotAllowed:comment});
    }
    
}
//view comments by user
exports.viewUserComments = async (req, res)=>{
    // console.log(req.query.id); return;
    commentModel.find({User_id:req.query.UserId}, (err, result)=>{
        // console.log(req.query.id); return;
        if(!err && result != null){
            res.status(200).send({msg:"Comments by user Returned", UserComments:result});
        }else{
            res.status(400).send({msg:"Error in returning Comments by user", error:err, UserComments:[]});
            // console.log(err); console.log(result);
        }
    }).populate([{path:"User_id", model:"UsersModel"},{path:"Post_id", model:"PostModel",
     populate:{path:"Fitness_id"}, populate:{path:"Nutrition_id"}, populate:{path:"Excercise_id"}}
        
    ])
}
//view comments by post
exports.viewPostComments = async (req, res)=>{
    commentModel.find({Post_id:req.query.postId}, (err, result)=>{
        if(err) return res.status(200).send({msg:"error in finding Post comments", error:err});
        if(!result) return res.status(200).send({msg:"Comment by Post not found", PostComments:[]});
        return res.status(200).send({msg:"Comments By Post", PostComments:result});
    }).populate([{path:"User_id", model:"UsersModel"}, {path:"Post_id", model:"PostModel"}]);
}
exports.editComment = async (req, res)=>{ //console.log(req.query.id);
    const comment = req.body.comment; //console.log(comment); return;
    const commentId = req.query.commentId;
    commentModel.findByIdAndUpdate({_id:commentId},{Comment_value:comment}, (err, result)=>{
        if(!err && result != null){
            // console.log(result);
            res.status(200).send({msg:"Comments Updated", Comment:result});
        }else{
            res.status(200).send({msg:"Comments Updating failed", Comment:[], error:err});
        }
    })
}
exports.deleteComment = async (req, res)=>{
    const commentId = req.query.commentId; //console.log(commentId); return;
    commentModel.findByIdAndDelete(commentId, (err, result)=>{
        if(!err && result != null){
            res.status(200).send({msg:"Comment deleted", comment:result});
        }else{
            res.status(400).send({msg:"Couldn't deleted comment", comment:[]});
        }
    })
}