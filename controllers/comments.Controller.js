const { empty } = require('@prisma/client/runtime/library');
const modelsComments = require('../models/comments.models')
const validation = require('../requests/commentInput');


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
            const check = validation.validateInput(req);

            if (check.error) {
                return res.redirect('back');
            }

            await modelsComments.createComment(req);
            res.redirect('back');

        } catch (error) {
            console.error('Error fetching comments:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async updateComment(req, res) {
        // console.log(req.body.updateContent);
        try {
            if (req.body.updateContent === "") {
                await modelsComments.deleteComment(req);
                res.redirect('back');
            } else {
                await modelsComments.updateComment(req);
                res.redirect('back');
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
    

    static async deleteComment(req,res) {
        // console.log(req.params.id);
            await modelsComments.deleteComment(req);
            res.redirect('back');
    }




    static async getEmail(req, res){
        try {
            const email = await modelsComments.getEmail(req);
            res.render('comments', { email });
        } catch (error) {
           
            return res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = {
    index : CommentController.index,
    store : CommentController.storeComment,
    getEmail : CommentController.getEmail,
    update : CommentController.updateComment,
    delete : CommentController.deleteComment
}