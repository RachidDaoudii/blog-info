const express = require('express');
const session = require('express-session');
const app = express();
const userRoutes = require('./routes/profile');
const articleRoutes = require('./routes/articles');
const commentsRoutes = require('./routes/comments');
const methodOverride = require('method-override');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Initialize the CSRF middleware and make it available to your routes
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Use method-override middleware
app.use(methodOverride('_method'));
// set style
app.use(express.static('public'));


const port = 3000;

const ejs = require('ejs');

// Parse JSON and URL-encoded bodies
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Configure session middleware
app.use(
    session({
        secret: 'any secret key', // hadi khassha tbdel darori bch t3ml session dyalk secure
        resave: false,
        saveUninitialized: true,
    })
);

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './public/views');

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});




// routes
app.use('/user', userRoutes);
app.use('/article', articleRoutes);
app.use('/comment', commentsRoutes);

app.listen(port, () => console.log(`Listening on port ${port}...`));
