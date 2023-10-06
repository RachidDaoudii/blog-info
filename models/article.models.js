const { PrismaClient } = require('@prisma/client');
const { date } = require('joi');
const prisma = new PrismaClient();

class article{
    static async getAll(){
        try {
            const articles = await prisma.blog.findMany();
            return articles
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(404).send('Internal Server Error');
        }
    }

    static async create(req){
        
        try {
            const articles = await prisma.blog.create({
                data : {
                    title : req.title,
                    content : req.content,
                    image : req.image.filename,
                    user_id: 1
                }
            });
            return articles

        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(404).send('Internal Server Error');
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

    static async update(req){
        try {
            const article = await prisma.blog.update({
                where : {
                    id : parseInt(req.params.id)
                },
                data : {
                    title : req.body.title,
                    content : req.body.content,
                    updated_at : new Date(),
                    image : req.file.filename
                }
            })
            return article
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(404).send('Internal Server Error');
        }
    }

    static async delete(req){
        try {
            const article = await prisma.blog.delete(
                {
                    where : {
                        id : parseInt(req.params.id)
                    }
                }
            );
            return article
        } catch (error) {
            console.error('Error fetching articles:', error);
            return res.status(404).send('Internal Server Error');
        }
    }

}

module.exports = article