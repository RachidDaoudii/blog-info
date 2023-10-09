const crypto = require('crypto');

function generateRandomToken(length) {
    return crypto.randomBytes(length).toString('hex');
}
const generateCSRFToken = (req, res, next) => {
    const csrfToken = generateRandomToken(32);
    res.cookie('csrfToken', csrfToken, { httpOnly: true });
    res.locals.csrfToken = csrfToken;
    next();
};
module.exports = generateCSRFToken;