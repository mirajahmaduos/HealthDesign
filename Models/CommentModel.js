const mongoose = require('mongoose');

const comment = mongoose.Schema({
    User_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserProfile",
        required: true
    },
    Post_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", 
        required: true
    },
    Comment_value:{
        type:String, required:true
    }
})
module.exports = mongoose.model("Comment", comment);