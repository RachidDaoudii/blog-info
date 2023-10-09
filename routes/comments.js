const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/comments.Controller');


router.get('/',CommentsController.index)
// router.get('/addCommment',CommentsController.add)
router.post('/addComment',CommentsController.store);
router.delete('/deleteComment/:id',CommentsController.delete);

module.exports = router;