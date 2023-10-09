const checkCsrfToken = (req, res, next) => {
    const csrfToken = req.body._csrf;
    const csrfCookie = req.cookies.csrfToken;
    if (csrfToken !== csrfCookie) {
        return res.send('CSRF token is invalid');
    }
    next();
}

module.exports = checkCsrfToken;
