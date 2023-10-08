const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/comments.Controller');


router.get('/',CommentsController.index)
router.get('/addCommment',CommentsController.addComment)
router.post('/addComment',CommentsController.storeComment);
router.delete('/deleteComment/:id',CommentsController.deleteComment);

module.exports = router;