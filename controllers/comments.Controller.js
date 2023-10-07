const modelsComments = require('../models/comments.models')

class CommentController {
    static async index(req, res) {
        try {
            const comment = await modelsComments.getAllComments(req, res);
            res.render('comments', { comment });
        } catch (error) {
            console.error('Error fetching comments:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async addComment(req,res) {
        try {
            res.render('addcomment');
        } catch (error) {
            console.error('Error fetching comments:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async storeComment(req,res) {
        try {
            const data = req.body
            const comment = await modelsComments.create(data);
            res.redirect('');
        } catch (error) {
            console.error('Error fetching comments:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async deleteComment(req,res) {

    }
}

module.exports = {
    index : CommentController.index,
    show : CommentController.show,
    add : CommentController.add,
    store : CommentController.store,
    edit : CommentController.edit,
    update : CommentController.update,
    delete : CommentController.delete
}