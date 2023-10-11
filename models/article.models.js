const { PrismaClient } = require("@prisma/client");
const { date } = require("joi");
const prisma = new PrismaClient();

class article {
  static async getAll() {
    try {
      const articles = await prisma.blog.findMany();
      return articles;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return res.status(404).send("Internal Server Error");
    }
  }

  static async create(req) {
    try {
      const articles = await prisma.blog.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          image: req.file.filename,
          user_id: parseInt(req.cookies.loggedIn_user),
        },
      });
      return articles;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return res.status(404).send("Internal Server Error");
    }
  }

  static async show(req) {
    try {
      const article = await prisma.blog.findUnique({
        select: {
          id: true,
          title: true,
          content: true,
          image: true,
          created_at: true,
          updated_at: true,
          Comment: {
            select: {
              id: true,
              content: true,
              created_at: true,
              User: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: {
              created_at: "desc",
            },
          },
          User: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        where: {
          id: parseInt(req.params.id),
        },
      });
      return article;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return res.status(404).send("Internal Server Error");
    }
  }

  static async update(req) {
    try {
      const article = await prisma.blog.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          title: req.body.title,
          content: req.body.content,
          updated_at: new Date(),
          image: req.body.image,
        },
      });
      return article;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return res.status(404).send("Internal Server Error");
    }
  }

  static async delete(req) {
    try {
      const article = await prisma.blog.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      return article;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return res.status(404).send("Internal Server Error");
    }
  }

  static async getArticleUser(req) {
    try {
      const articles = await prisma.blog.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          image: true,
          created_at: true,
          updated_at: true,
        },
        where: {
          user_id: parseInt(req.cookies.loggedIn_user),
        },
      });
      return articles;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return res.status(404).send("Internal Server Error");
    }
  }
}

module.exports = article;
