const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/comments.Controller');


router.get('/',CommentsController.index)
router.post('/addComment',CommentsController.store);
router.post('/updateComment/:id',CommentsController.update)
router.delete('/deleteComment/:id',CommentsController.delete);

module.exports = router;