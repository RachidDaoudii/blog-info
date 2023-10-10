class authorization {
  static isAuthorization = (req, res, next) => {
    console.log(req.body);
    if (req.cookies.loggedIn_user) {
      next();
    } else {
      return res.render("auth/login", {
        error: "You must be logged in to access this page",
      });
    }
  };
}

module.exports = authorization;
