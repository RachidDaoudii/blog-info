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
    
    // static async addComment(req,res) {
    //     try {
    //         res.render('addcomment');
    //     } catch (error) {
    //         console.error('Error fetching comments:', error);
    //         return res.status(500).send('Internal Server Error');
    //     }
    // }

    static async storeComment(req,res) {
        try {
            await modelsComments.createComment(req);
            const comments = await modelsComments.getAllComments();
            res.render('comments', { comments });

        } catch (error) {
            console.error('Error fetching comments:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async deleteComment(req,res) {
            await modelsComments.delete(req);
            res.redirect('/comment');
    }
}

module.exports = {
    index : CommentController.index,
    // add : CommentController.addComment,
    store : CommentController.storeComment,
    // edit : CommentController.edit,
    // update : CommentController.updateC,
    delete : CommentController.deleteComment
}