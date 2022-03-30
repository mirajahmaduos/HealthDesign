const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactionSchema = Schema({
    User_id:{
        type: Schema.Types.ObjectId,
        ref: "UserProfile",
        required: true
    },
    Post_id:{
        type: Schema.Types.ObjectId,
        refs: "Post", 
        required: true
    },
    Reaction_value:{
        type:String,
        enum: ['Like', 'Love', 'Sad', 'Angry', 'Wow', 'Care', 'Haha'],
        default: null
    }
}, {versionKey:false})
module.exports = mongoose.model("ReactionModel", reactionSchema, collection="Reactions");