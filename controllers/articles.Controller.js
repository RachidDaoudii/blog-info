const modelsArticles = require('../models/article.models')

class ArticleController {
    static async index(req, res) {
        try {
            const articles = await modelsArticles.getAll(req, res);
            res.render('AllArticle', { articles });
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async show(req,res) {
        try {
            const article = await modelsArticles.show(req,res);
            res.render('showArticle', { article });
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async add(req,res) {
        try {
            res.render('addArticle');
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async store(req,res) {
        try {
            const data = req.body
            const articles = await modelsArticles.create(data);
            res.redirect('/article');
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async edit(req,res) {

    }

    static async update(req,res) {

    }

    static async delete(req,res) {

    }
}

module.exports = {
    index : ArticleController.index,
    show : ArticleController.show,
    add : ArticleController.add,
    store : ArticleController.store,
    edit : ArticleController.edit,
    update : ArticleController.update,
    delete : ArticleController.delete
}