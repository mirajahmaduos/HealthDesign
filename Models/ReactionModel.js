const mongoose = require('mongoose');

const reaction = mongoose.Schema({
    User_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserProfile",
        required: true
    },
    Post_id:{
        type: mongoose.Schema.Types.ObjectId,
        refs: "Post", 
        required: true
    },
    Reaction_value:{
        type:String,
        enum: ['Like', 'Love', 'Sad', 'Angry', 'Wow'],
        default: null
    }
})
module.exports = mongoose.model("Reaction", reaction);