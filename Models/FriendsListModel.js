const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = Schema({
    //requesting user /
    AddRequest:{ //sender, follower , send request , connect, add friend / sender user /follow
        type:Schema.Types.ObjectId,
        ref: 'UsersModel',
        required: true,
    },
    //receiving user / 
    RecieveRequest:{ // receiver , following, accept request, yes, okay / receiver user
        type:Schema.Types.ObjectId,
        ref: 'UsersModel',
        required:true
    },
    RequestValue:{ // sender request value i.e follow/addfriend, unfollow/unfriend, block
        type:String,
        enum: ['Follow', 'Unfollow', 'Block'], //unfollow is updating existing follow and vice versa. 
        required:true
    }
}, {versionKey:false});

module.exports = mongoose.model("FriendsListModel", friendSchema, collection="FriendsList")