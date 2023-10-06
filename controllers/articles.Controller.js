const modelsArticles = require('../models/article.models')

class ArticleController {
    static async index(req, res) {
        try {
            const articles = await modelsArticles.getAll();
            res.render('article/AllArticle', { articles });
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(404).send('Internal Server Error');
        }
    }

    static async show(req,res) {
        try {
            const article = await modelsArticles.show(req,res);
            res.render('article/showArticle', { article });
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(404).send('Internal Server Error');
        }
    }

    static async add(res) {
        try {
            res.render('article/addArticle');
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(404).send('Internal Server Error');
        }
    }

    static async store(req,res) {
        try {
            const data = req.body
            data.image = req.file
            const articles = await modelsArticles.create(data);
            res.redirect('/article');
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(404).send('Internal Server Error');
        }
    }

    static async edit(req,res) {
        try {
            const article = await modelsArticles.show(req,res);
            res.render('article/editArticle', { article });
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(404).send('Internal Server Error');
        }
    }

    static async update(req,res) {
        try {
            const articles = await modelsArticles.update(req);
            res.redirect('/article');
            
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(404).send('Internal Server Error');
        }
    }

    static async delete(req,res) {
        try {
            const article = await modelsArticles.delete(req);
            res.redirect('/article');
        } catch (error) {
            onsole.error('Error fetching articles:', error);
            return res.status(404).send('Internal Server Error');
        }
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