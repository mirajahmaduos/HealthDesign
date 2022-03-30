var express = require('express');
var reactionController = require('../Controllers/ReactionController');
var reactionRouter = express.Router();

reactionRouter.post('/addreaction', reactionController.addReaction);
reactionRouter.get('/viewbyuser', reactionController.viewReactionByUser);
reactionRouter.get('/viewbypost', reactionController.viewReactionByPost);
reactionRouter.delete('/deleteorrollback', reactionController.deleteORrollbackReaction);
reactionRouter.post('/statsbypost', reactionController.reactionStatsByPost);
reactionRouter.post('/statsbyuser', reactionController.reactionStatsByUser);

module.exports = reactionRouter;