const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/comments.Controller');
const isAuth = require("../middlewares/isAuthenticated");


router.get('/', CommentsController.index)
router.post('/addComment', isAuth.isAuthenticated,CommentsController.store);
router.post('/updateComment/:id', isAuth.isAuthenticated,CommentsController.update)
router.delete('/deleteComment/:id', isAuth.isAuthenticated,CommentsController.delete);

module.exports = router;