var express = require('express');
var postController = require('../Controllers/PostController');
var postRouter = express.Router();

postRouter.post('/create', postController.createPost);

postRouter.get('/views', postController.viewPosts);

module.exports = postRouter;
