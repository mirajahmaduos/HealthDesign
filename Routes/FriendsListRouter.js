var express = require('express');
var friendRouter = express.Router();
var friendController = require('../Controllers/FriendsListController');

friendRouter.post('/follow', friendController.addFriend);
friendRouter.put('/unfollow', friendController.unFriend);
// friendRouter.put('/block', friendController.blockUser);
friendRouter.get('/userstats', friendController.userStats);

module.exports = friendRouter;