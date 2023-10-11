const modelsArticles = require("../models/article.models");
const unlink = require("../helpers/imageHelper");
const validation = require("../requests/requestArticle");

class ArticleController {
    static errorMessage = null;
    static successMessage = null;

    static async index(req, res) {
        try {
            let loggedInUser = req.cookies.loggedIn_user;
            const articles = await modelsArticles.getAll();
            ArticleController.successMessage = null;

<<<<<<< HEAD
            res.render("article/AllArticle", {
                articles, successMessage: ArticleController.successMessage, loggedInUser: loggedInUser
            });
        } catch (error) {
            console.error("Error fetching articles:", error);
            return res.status(404).send("Internal Server Error");
        }
=======
      res.render("article/AllArticle", {
        articles,
        successMessage: ArticleController.successMessage,
        loggedInUser: loggedInUser,
      });
    } catch (error) {
      console.error("Error fetching articles:", error);
      return res.status(404).send("Internal Server Error");
>>>>>>> e4e103a99212d9d9916d0607b66e0518acdc71d1
    }

    static async show(req, res) {
        try {
            const article = await modelsArticles.show(req, res);
            res.render("article/showArticle", {article});
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
            console.error("Error fetching articles:", {error});
            return res.status(404).send("Internal Server Error");
        }
    }

    static async store(req, res) {
        try {
            const check = validation.validateInput(req);

<<<<<<< HEAD
            if (check.error) {
                ArticleController.errorMessage = "All is required";
                return res.status(400).render("article/addArticle", {
                    errorMessage: ArticleController.errorMessage,
                });
            }

            await modelsArticles.create(req);
            ArticleController.successMessage = "Article Added Successfully";
            const articles = await modelsArticles.getAll();

            res.status(201).render("article/AllArticle", {
                articles, successMessage: ArticleController.successMessage,
            });
        } catch (error) {
            ArticleController.errorMessage = error;
            res.status(400).render("article/addArticle", {
                errorMessage: ArticleController.errorMessage,
            });
        }
=======
      const csrfToken = req.body._csrf;
      const csrfCookie = req.cookies.csrfToken;
      if (csrfToken !== csrfCookie) {
        return res.send("CSRF token is invalid");
      }

      if (check.error) {
        ArticleController.errorMessage = "All is required";
        return res.status(400).render("article/addArticle", {
          errorMessage: ArticleController.errorMessage,
        });
      }

      await modelsArticles.create(req);
      ArticleController.successMessage = "Article Added Successfully";

      return res.redirect("/article/dashborad");

    } catch (error) {
      ArticleController.errorMessage = error;
      res.status(400).render("article/addArticle", {
        errorMessage: ArticleController.errorMessage,
      });
>>>>>>> e4e103a99212d9d9916d0607b66e0518acdc71d1
    }

    static async edit(req, res) {
        try {
            const article = await modelsArticles.show(req, res);
            res.render("article/editArticle", {article});
        } catch (error) {
            console.error("Error fetching articles:", error);
            return res.status(404).send("Internal Server Error");
        }
    }

<<<<<<< HEAD
    static async update(req, res) {
        try {
            if (!req.file) {
                req.body.image = req.body.old_image;
            } else {
                req.body.image = req.file.filename;
                await unlink.unlinkimage(req.body.old_image);
            }

            const articles = await modelsArticles.update(req);
            res.redirect("/article");
        } catch (error) {
            console.error("Error fetching articles:", error);
            return res.status(404).send("Internal Server Error");
        }
=======
  static async update(req, res) {
    try {
      const csrfToken = req.body._csrf;
      const csrfCookie = req.cookies.csrfToken;
      if (csrfToken !== csrfCookie) {
        return res.send("CSRF token is invalid");
      }

      if (!req.file) {
        req.body.image = req.body.old_image;
      } else {
        req.body.image = req.file.filename;
        await unlink.unlinkimage(req.body.old_image);
      }

      const articles = await modelsArticles.update(req);
      ArticleController.successMessage = "Article updated Successfully";
      return res.redirect("/article/dashborad");

    } catch (error) {
      console.error("Error fetching articles:", error);
      return res.status(404).send("Internal Server Error");
>>>>>>> e4e103a99212d9d9916d0607b66e0518acdc71d1
    }

<<<<<<< HEAD
    static async delete(req, res) {
        try {
            const article = await modelsArticles.delete(req);
            await unlink.unlinkimage(article.image);
            ArticleController.successMessage = "Article Deleted Successfully";
            res.redirect("/article");
        } catch (error) {
            console.error("Error fetching articles:", error);
            return res.status(404).send("Internal Server Error");
        }
=======
  static async delete(req, res) {
    try {
      const csrfToken = req.body._csrf;
      const csrfCookie = req.cookies.csrfToken;
      console.log(csrfCookie, csrfToken);
      if (csrfToken !== csrfCookie) {
        return res.send("CSRF token is invalid");
      }

      const article = await modelsArticles.delete(req);
      await unlink.unlinkimage(article.image);
      ArticleController.successMessage = "Article Deleted Successfully";
      return res.redirect("/article/dashborad");
    } catch (error) {
      console.error("Error fetching articles:", error);
      return res.status(404).send("Internal Server Error");
>>>>>>> e4e103a99212d9d9916d0607b66e0518acdc71d1
    }

<<<<<<< HEAD
    static async dashboard(req, res) {
        const articles = await modelsArticles.getArticleUser(req);
        return res.render("article/dashboard", {articles});
    }
=======
  static async dashboard(req, res) {
    const articles = await modelsArticles.getArticleUser(req);
    return res.render("article/dashboard", {
      articles,
      successMessage: ArticleController.successMessage,
      errorMessage: ArticleController.errorMessage,
    });
  }
>>>>>>> e4e103a99212d9d9916d0607b66e0518acdc71d1
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
