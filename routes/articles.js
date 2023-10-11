const express = require("express");
const router = express.Router();
const ControllerArticle = require("../controllers/articles.Controller");
const imageHelper = require("../helpers/imageHelper");

const isAuth = require("../middlewares/isAuthenticated");

// const checkTekon = (req, res, next)=>{
//     res.locals.csrfToken = req.csrfToken();
//     next();
// }

router.get("/", ControllerArticle.index);
router.get("/add", isAuth.isAuthenticated, ControllerArticle.add);
router.post(
  "/add",
  imageHelper.upload.single("image"),
  ControllerArticle.store
);
router.get("/show/:id", ControllerArticle.show);
router.get("/edit/:id", isAuth.isAuthenticated, ControllerArticle.edit);
router.post(
  "/update/:id",
  isAuth.isAuthenticated,
  imageHelper.upload.single("image"),
  ControllerArticle.update
);
router.delete("/delete/:id", isAuth.isAuthenticated, ControllerArticle.delete);
router.get("/dashborad", isAuth.isAuthenticated, ControllerArticle.dashboard);

module.exports = router;
