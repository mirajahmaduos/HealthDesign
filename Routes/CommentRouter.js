var express = require('express');
var commentRouter = express.Router();
var commentController = require('../Controllers/CommentController');

commentRouter.post('/postcomment', commentController.postComment);

commentRouter.get('/viewusercomment/', commentController.viewUserComments);
commentRouter.get('/viewpostcomment', commentController.viewPostComments);
commentRouter.put('/updatecomment', commentController.editComment);
commentRouter.delete('/deletecomment', commentController.deleteComment);

module.exports = commentRouter;