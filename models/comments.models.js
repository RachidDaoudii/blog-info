const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class comments{
    static async getAllComments(res){
        try {
            const comments = await prisma.comment.findMany();
            return comments ;
        } catch (error) {
            console.error('Error fetching comments:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
  
    static async createComment(req, res){
        try {
            const comments = await prisma.comment.create({
                data : {
                    content : req.body.content,
                    user_id: 1,
                    blog_id: 1
                }
            });
            return comments

        } catch (error) {
            console.error('Error fetching comments:', error);
            return res.status(500).send('Internal Server Error');
        }
    }


    static async deleteComment(req, res){
        try {
            const comment = await prisma.comment.delete(
                {
                    where : {
                        id : parseInt(req.params.id)
                    }
                }
            );
            return comment
        } catch (error) {
            console.error('Error fetching comments:', error);
            return res.status(404).send('Internal Server Error');
        }
        
    }

}

module.exports = comments ;