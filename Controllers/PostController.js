var postModel = require('../Models/PostModel');

exports.createPost = async (req, res)=>{
    // console.log(req.body); return;
    postModel.create(req.body, (err, result)=>{
        if(!err && result != null){
            res.status(200).send({msg:"Post Added Successfully", post:result});
        }else{
            res.status(400).send({msg:"Error in creating post", error:err});
        }
    })
}

exports.viewPosts = async(req, res)=>{
    postModel.find((err, result)=>{
        if(err) return res.status(400).send({msg:"Error in getting Posts", error:err});
        if(!result) return res.status(400).send({msg:"Posts Not found", reuslt:[]});
        res.status(200).send({msg:"All Posts Returned", posts:result});
    })
}