const modelsArticles = require("../models/article.models");
const unlink = require("../helpers/imageHelper");
const validation = require("../requests/requestArticle");

class ArticleController {
  static errorMessage = null;
  static successMessage = null;

  static async index(req, res) {
    try {
      const articles = await modelsArticles.getAll();
      ArticleController.successMessage = null;

      res.render("article/AllArticle", {
        articles,
        successMessage: ArticleController.successMessage,
      });
    } catch (error) {
      console.error("Error fetching articles:", error);
      return res.status(404).send("Internal Server Error");
    }
  }

  static async show(req, res) {
    try {
      const article = await modelsArticles.show(req, res);
      res.render("article/showArticle", { article });
    } catch (error) {
      console.error("Error fetching articles:", error);
      return res.status(404).send("Internal Server Error");
    }
  }

  static async add(req, res) {
    try {
      ArticleController.errorMessage = null;
      res.render("article/addArticle", {
        errorMessage: ArticleController.errorMessage,
      });
    } catch (error) {
      console.error("Error fetching articles:", { error });
      return res.status(404).send("Internal Server Error");
    }
  }

  static async store(req, res) {
    try {
      const check = validation.validateInput(req);

      if (check.error) {
        ArticleController.errorMessage = "All is required";
        return res.status(400).render("article/addArticle", {
          errorMessage: ArticleController.errorMessage,
        });
      }

      await modelsArticles.create(req);
      ArticleController.successMessage = "Article Added Successfully";
      ArticleController.dashboard(req, res);
    } catch (error) {
      ArticleController.errorMessage = error;
      res.status(400).render("article/addArticle", {
        errorMessage: ArticleController.errorMessage,
      });
    }
  }

  static async edit(req, res) {
    try {
      const article = await modelsArticles.show(req, res);
      res.render("article/editArticle", { article });
    } catch (error) {
      console.error("Error fetching articles:", error);
      return res.status(404).send("Internal Server Error");
    }
  }

  static async update(req, res) {
    try {
      if (!req.file) {
        req.body.image = req.body.old_image;
      } else {
        req.body.image = req.file.filename;
        await unlink.unlinkimage(req.body.old_image);
      }

      const articles = await modelsArticles.update(req);
      ArticleController.successMessage = "Article updated Successfully";
      ArticleController.dashboard(req, res);
    } catch (error) {
      console.error("Error fetching articles:", error);
      return res.status(404).send("Internal Server Error");
    }
  }

  static async delete(req, res) {
    try {
      const article = await modelsArticles.delete(req);
      await unlink.unlinkimage(article.image);
      ArticleController.successMessage = "Article Deleted Successfully";
      ArticleController.dashboard(req, res);
    } catch (error) {
      console.error("Error fetching articles:", error);
      return res.status(404).send("Internal Server Error");
    }
  }

  static async dashboard(req, res) {
    const articles = await modelsArticles.getArticleUser(req);
    return res.render("article/dashboard", {
      articles,
      successMessage: ArticleController.successMessage,
      errorMessage: ArticleController.errorMessage,
    });
  }
}

module.exports = {
  index: ArticleController.index,
  show: ArticleController.show,
  add: ArticleController.add,
  store: ArticleController.store,
  edit: ArticleController.edit,
  update: ArticleController.update,
  delete: ArticleController.delete,
  dashboard: ArticleController.dashboard,
  errorMessage: ArticleController.errorMessage,
  successMessage: ArticleController.successMessage,
};
