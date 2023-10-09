const express = require('express');
const router = express.Router();
const ControllerArticle = require('../controllers/articles.Controller');
const imageHelper = require('../helpers/imageHelper');



const checkTekon = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

// router.get('/', ControllerArticle.index)
// router.get('/add', checkTekon, ControllerArticle.add)
// router.post('/add', imageHelper.upload.single('image'), ControllerArticle.store);
// router.get('/show/:id', ControllerArticle.show);
// router.get('/edit/:id', ControllerArticle.edit);
// router.post('/update/:id', imageHelper.upload.single('image'), ControllerArticle.update);
// router.delete('/delete/:id', ControllerArticle.delete);

module.exports = router;