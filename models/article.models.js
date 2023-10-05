const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class article{
    static async getAll(res){
        try {
            const articles = await prisma.blog.findMany();
            return articles
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async create(req){
        try {
            const articles = await prisma.blog.create({
                data : {
                    title : req.title,
                    content : req.content,
                    image : req.image,
                    user_id: parseInt(req.user_id)
                }
            });
            return articles

        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async show(req){
        try {
            const article = await prisma.blog.findUnique(
                {
                    where : {
                        id : parseInt(req.params.id)
                    }
                }
            )
            return article
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(404).send('Internal Server Error');
        }
        
    }

}

module.exports = article