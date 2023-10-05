const express = require('express');
const router = express.Router();
const ControllerArticle = require('../controllers/articles.Controller')

router.get('/',ControllerArticle.index)
router.get('/add',ControllerArticle.add)
router.post('/add',ControllerArticle.store);
router.get('/show/:id',ControllerArticle.show);

module.exports = router;