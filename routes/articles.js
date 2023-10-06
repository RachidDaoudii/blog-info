const express = require('express');
const router = express.Router();
const ControllerArticle = require('../controllers/articles.Controller');
const upload = require('../helpers/imageHelper');


router.get('/',ControllerArticle.index)
router.get('/add',ControllerArticle.add)
router.post('/add', upload.single('image') ,ControllerArticle.store);
router.get('/show/:id',ControllerArticle.show);
router.get('/edit/:id',ControllerArticle.edit);
router.post('/update/:id',upload.single('image'),ControllerArticle.update);
router.delete('/delete/:id',ControllerArticle.delete);

module.exports = router;