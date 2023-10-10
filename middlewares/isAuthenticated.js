class auth {
  static isAuthenticated = (req, res, next) => {
    console.log(req.body);
    if (req.cookies.loggedIn_user) {
      next();
    } else {
      return res.render("auth/login", {
        error: "You must be logged in to access this page",
      });
    }
  };

  static isAuthorization = (req, res, next) => {
    if (req.cookies.loggedIn_user) {
      if (req.cookies.loggedIn_user == req.params.id) {
        next();
      } else {
        return res.render("auth/login", {
          error: "You must be logged in to access this page",
        });
      }
    } else {
      return res.render("auth/login", {
        error: "You must be logged in to access this page",
      });
    }
  };
}

module.exports = auth;
