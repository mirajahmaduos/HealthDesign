const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    User_id:{
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    Post_id:{
        type: Schema.Types.ObjectId,
        ref: "PostModel", 
        required: true
    },
    Comment_value:{
        type:String, required:true
    }
}, {versionKey:false})
module.exports = mongoose.model("CommentModel", commentSchema, collection="Comments");