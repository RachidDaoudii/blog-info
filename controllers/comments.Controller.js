const modelsComments = require('../models/comments.models')

class CommentController {
    static async index(req, res) {
        try {
            const comments = await modelsComments.getAllComments();
            res.render('comments', { comments });
        } catch (error) {
            console.error('Error fetching comments:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
    

    static async storeComment(req,res) {
        try {
            await modelsComments.createComment(req);
            res.redirect('/comment');

        } catch (error) {
            console.error('Error fetching comments:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async updateComment(req,res) {
        try {
            await modelsComments.updateComment(req);
            res.redirect('/comment');

        } catch (error) {
            console.error('Error fetching comments:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async deleteComment(req,res) {
        // console.log(req.params.id);
        // console.log(req.body);
            await modelsComments.deleteComment(req);
            res.redirect('/comment');
    }
}

module.exports = {
    index : CommentController.index,
    store : CommentController.storeComment,
    update : CommentController.updateComment,
    delete : CommentController.deleteComment
}