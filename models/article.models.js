const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class article{
    static async getAll(req,res){
        try {
            const articles = await prisma.blog.findMany();
            return articles
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async create(req,res){
        try {
            const articles = await prisma.blog.create({
                data : {
                    title : req.body.title,
                    content : req.body.content,
                    image : req.bbidy.image,
                    user_id: req.body.user_id
                }
            });
            return articles
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

}

module.exports = article